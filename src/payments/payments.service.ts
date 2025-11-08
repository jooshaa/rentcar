import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Payment } from './entities/payment.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PaymentsService {
  constructor(
    @InjectRepository(Payment)
    private readonly paymentRepo: Repository<Payment>
  ) { }

  async create(createPaymentDto: CreatePaymentDto) {
    const payment = this.paymentRepo.create({
      ...createPaymentDto,
      rental: { id: createPaymentDto.rental_id }
    })
    return await this.paymentRepo.save(payment)
  }

  async findAll() {
    return this.paymentRepo.find({})
  }

  async findOne(id: number) {
    const payment = await this.paymentRepo.findOne({
      where: { id },
    })
    if (!payment) {
      throw new NotFoundException("not found")
    }
    return payment
  }

  async update(id: number, updatePaymentDto: UpdatePaymentDto) {
    const payment = await this.findOne(id);
    Object.assign(payment, updatePaymentDto)
    return await this.paymentRepo.save(payment)
  }

  async remove(id: number) {
    const payment = await this.findOne(id);
    await this.paymentRepo.remove(payment)
    return { message: "car-payment deleted" }
  }
}
