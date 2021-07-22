import { Body, Controller, Delete, Get, Post,Request, UseGuards } from '@nestjs/common';
import { Observable } from 'rxjs';
import { JwtAuthGuard } from 'src/auth/guards/jwt-guards';
import { Cart } from './cart.interface';

import { CartService } from './cart.service';

@Controller('cart')
export class CartController {


    constructor(private cartService:CartService){}
    
    @Get('getCartItems')
    getCart(){
        this.cartService.findAll();
    }


    //input 
    // {
    //     "cartItems":[
    //         {
    //             "product": 2,
    //             "orderQuantity": 2,
    //             "extendedCost": 10
    //         },
    //          {
    //             "product": 4,
    //             "orderQuantity": 2,
    //             "extendedCost": 10
    //         }
    //     ]
       
    // }
    @UseGuards(JwtAuthGuard)
    @Post('addToCart')
    addToCart(@Body() cartEntry: Cart, @Request() req):Observable<Cart>{
        const user = req.user;
        return this.cartService.create(user,cartEntry);
    }

    @Delete()
    removeItem(){
        return ;
    }

}
