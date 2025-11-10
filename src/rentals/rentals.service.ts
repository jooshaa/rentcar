import { forwardRef, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateRentalDto } from './dto/create-rental.dto';
import { UpdateRentalDto } from './dto/update-rental.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Rental, RentalStatus } from './entities/rental.entity';
import { CarService } from '../car/car.service';
import { CreateCarDto } from '../car/dto/create-car.dto';
import { State } from '../car/entities/car.entity';
import { PaymentsService } from '../payments/payments.service';
import { PaymentStatus } from '../payments/entities/payment.entity';
import { CreatePaymentDto } from '../payments/dto/create-payment.dto';


function calcTotalPrice(start: Date, end: Date, perDayPrice: number): number {
  const startTime = new Date(start).getTime();
  const endTime = new Date(end).getTime();

  if (endTime <= startTime) return 0;

  const msPerDay = 1000 * 60 * 60 * 24;
  const diffDays = Math.ceil((endTime - startTime) / msPerDay);

  return diffDays * perDayPrice;
}



@Injectable()
export class RentalsService {
  constructor(
    @InjectRepository(Rental)
    private readonly rentalRepo: Repository<Rental>,
    private readonly carService: CarService,
    @Inject(forwardRef(() => PaymentsService))
    private readonly paymentService: PaymentsService,
  ) { }

  async create(createRentalDto: CreateRentalDto) {
    const car = await this.carService.findOne(createRentalDto.car_id)
    const price = calcTotalPrice(new Date(createRentalDto.pickup_datetime), new Date(createRentalDto.return_datetime), car.per_day_price)
    const Rental = this.rentalRepo.create({
      ...createRentalDto,
      total_price: price,
      client: { id: createRentalDto.client_id },
      cars: { id: createRentalDto.car_id },
      pickupBranch: { id: createRentalDto.pickup_branch_id },
      returnBranch: { id: createRentalDto.return_branch_id }
    })

    const rentals = await this.rentalRepo.save(Rental)

    console.log(rentals.id);
    
    const dto = {
      rental_id: rentals.id,
      amount: rentals.total_price,
      currency: null,
      status: PaymentStatus.PENDING,
      method: null,
      paid_at: null
    }
    const createdPayment = await this.paymentService.autoCreate(dto)

    /*>>>>>>>>>>>>>>>>>> here is the logic changing status depending on payment but here it is extra <<<<<<<<<<<<<<<<<<<*/

    // const statusOfPay = await this.paymentService.findByRentalId(rentals.id)
    // if(!statusOfPay){
    //   return new Error("create a payment for rentals")
    // }
    // if(createRentalDto.status === "pending" && statusOfPay.status ===  PaymentStatus.PENDING){
    //   await this.carService.update(createRentalDto.car_id, {state: State.BOOKED})
    // }

    // if (createRentalDto.status === "renting" && statusOfPay.status === PaymentStatus.COMPLETED){
    //   await this.carService.update(createRentalDto.car_id, { state: State.RENTED, next_available_at: new Date(createRentalDto.return_datetime) })

    // }
    return rentals
  }
  //* create automatic payment when posted a rentals  */

  //if payment completed and rental pending then car = rented
  //if payment pending and retal pending them car booked
  // if payment cancelled then nothing change


  async findAll() {
    return this.rentalRepo.find({
      relations: ["client", "pickupBranch", "returnBranch"],
      select: {
        client: { id: true, fullname: true, phone: true },
        pickupBranch: { name: true, address: true, phone: true },
        returnBranch: { name: true, address: true, phone: true }
      }
    })
  }

  async findOne(id: number) {
    const rental = await this.rentalRepo.findOne({
      where: { id },
      relations: ["client", "pickupBranch", "returnBranch", "cars"],
      select: {
        client: { id: true, fullname: true, phone: true },
        pickupBranch: { name: true, address: true, phone: true },
        returnBranch: { name: true, address: true, phone: true },
        cars: {id:true, photo:true, carModel:{name: true, car_type: true, seats: true, fuel_type: true}}
      }
    })
    if (!rental) {
      throw new NotFoundException("not found")
    }
    console.log(rental.cars);
    
    return rental
  }

  // findByRentalId(id: number) {
  //   if (!id) throw new Error("ID is required");
  //   return this.rentalRepo.findOne({
  //     where: { rental: { id } }
  //   })
  // }

  async update(id: number, updateRentalDto: UpdateRentalDto) {
    const rental = await this.findOne(id);
    Object.assign(rental, updateRentalDto)
    if (updateRentalDto.status === "cancelled") {
      await this.carService.update(rental.cars.id, { state: State.AVAILABLE, next_available_at: undefined })
    }
    return await this.rentalRepo.save(rental)
  }

  async remove(id: number) {
    const rental = await this.findOne(id);
    // console.log(rental). problem with it 
    // await this.carService.update(rental.cars.id, { state: State.AVAILABLE, next_available_at: undefined })
    await this.rentalRepo.remove(rental)

    return { message: "car-rental deleted" }

  }

  async completed(id: number) {
    const rental = await this.findOne(id);
    console.log(rental)
    rental.status = RentalStatus.COMPLETED
    console.log(rental.cars);
    
    await this.carService.update(rental.cars.id, { state: State.AVAILABLE, next_available_at: null })
    
    return await this.rentalRepo.findOne({
      where: {id},
      relations: ["cars", "pickupBranch", "returnBranch", "client"],
      select: {
        id: true, 
        pickup_datetime: true,
        return_datetime: true ,
        total_price: true,
        client:{
          fullname: true,
          phone: true 
        },
        cars: {
          number_plate: true,
          carModel:{
            name: true,
            car_type: true,
            seats: true
          }
        },
        pickupBranch:{
          name: true,
          phone: true,
          address: true
        },
        returnBranch: {
          name: true,
          phone: true,
          address: true
        }
      }

    })

  }

}
