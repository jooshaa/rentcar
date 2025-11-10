import { BadRequestException, forwardRef, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Payment } from './entities/payment.entity';
import { Repository } from 'typeorm';
import { RentalsService } from '../rentals/rentals.service';
import { RentalStatus } from '../rentals/entities/rental.entity';
import { CarService } from '../car/car.service';
import { State } from '../car/entities/car.entity';

@Injectable()
export class PaymentsService {
  constructor(
    @InjectRepository(Payment)
    private readonly paymentRepo: Repository<Payment>,
    @Inject(forwardRef(() => RentalsService))
    private readonly rentalService: RentalsService,
    private readonly carService: CarService
  ) { }

  async create(createPaymentDto: CreatePaymentDto) {
    const payment = this.paymentRepo.create({
      ...createPaymentDto,
      rental: { id: createPaymentDto.rental_id }
    })
    // if (createPaymentDto.status === "cancelled") {
    //   this.rentalService.update(createPaymentDto.rental_id, { status: RentalStatus.CANCELLED })
    //   const rental = await this.rentalService.findOne(createPaymentDto.rental_id)
    //   await this.carService.update(rental.cars.id, {state: State.AVAILABLE, next_available_at: undefined})
    // }
    if (createPaymentDto.status === "completed") {
      this.rentalService.update(createPaymentDto.rental_id, { status: RentalStatus.RENTING })
      const rental = await this.rentalService.findOne(createPaymentDto.rental_id)
      await this.carService.update(rental.cars.id, { state: State.RENTED, next_available_at: rental.return_datetime })
    }
    if (createPaymentDto.status === "pending") {
      this.rentalService.update(createPaymentDto.rental_id, { status: RentalStatus.PENDING })
      const rental = await this.rentalService.findOne(createPaymentDto.rental_id)
      await this.carService.update(rental.cars.id, { state: State.BOOKED, next_available_at: undefined })
    }

    return await this.paymentRepo.save(payment)
  }
  async autoCreate(dto) {
    const payment = this.paymentRepo.create({
      ...dto,
      rental: { id: dto.rental_id }
    })
    await this.paymentRepo.save(payment)
  }


  findByRentalId(id: number) {
    if (!id) throw new Error("ID is required");
    return this.paymentRepo.findOne({
      where: { rental: { id } }
    })
  }

  async findAll() {
    return this.paymentRepo.find({
      relations: ["rental"]
    })
  }

  async findOne(id: number) {
    const payment = await this.paymentRepo.findOne({
      where: { id },
      relations: ["rental"]
    })
    if (!payment) {
      throw new NotFoundException("not found")
    }
    return payment
  }

  async update(id: number, updatePaymentDto: UpdatePaymentDto) {
    const payment = await this.findOne(id);
    // console.log(payment.rental.id);
    updatePaymentDto.paid_at = new Date().toISOString()
    // console.log(updatePaymentDto);  
    Object.assign(payment, updatePaymentDto)
    console.log(payment);
    
    // if (!updatePaymentDto.rental_id) {
    //   return new BadRequestException("indicate your rental id")
    // }
    
    if (updatePaymentDto.status === "cancelled") {
      await this.rentalService.update(payment.rental.id, { status: RentalStatus.CANCELLED })
      const rental = await this.rentalService.findOne(payment.rental.id)
      await this.carService.update(rental.cars.id, { state: State.AVAILABLE, next_available_at: null })
    }
    if (updatePaymentDto.status === "completed") {
      await this.rentalService.update(payment.rental.id, { status: RentalStatus.RENTING })
      const rental = await this.rentalService.findOne(payment.rental.id)
      await this.carService.update(rental.cars.id, { state: State.RENTED, next_available_at: rental.return_datetime })
    }
    if (updatePaymentDto.status === "pending") {
      await this.rentalService.update(payment.rental.id, { status: RentalStatus.PENDING })
      const rental = await this.rentalService.findOne(payment.rental.id)
      await this.carService.update(rental.cars.id, { state: State.BOOKED, next_available_at: null })
    }
    return await this.paymentRepo.save(payment)
  }

  async remove(id: number) {
    const payment = await this.findOne(id);
    await this.paymentRepo.remove(payment)
    return { message: "car-payment deleted" }
  }
}
