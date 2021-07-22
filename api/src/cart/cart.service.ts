import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { from, Observable } from 'rxjs';
import { User } from 'src/user/models/user.interface';
import { UserService } from 'src/user/service/user.service';
import { Repository } from 'typeorm';
import { CartEntity } from './cart.entity';
import { Cart } from './cart.interface';

@Injectable()
export class CartService {
    constructor(
        @InjectRepository(CartEntity) private readonly cartRepository: Repository<CartEntity>,
        private userService:UserService
    ){}

    create(user: User, cartEntry: Cart): Observable<Cart> {
        cartEntry.user = user;
        //if cart not exist=> create cart for this user.
        //if cart exist then we just update new quantity for this product.

        
        return from(this.cartRepository.save(cartEntry));
        
        
    }
    findAll() {
        throw new Error('Method not implemented.');
    }
    findByUserId(id:number):Observable<Cart>{
        return from(this.cartRepository.findOne({id}))
    }
}
