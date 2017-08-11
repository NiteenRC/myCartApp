package com.fico.demo.controller;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.fico.demo.exception.CustomErrorType;
import com.fico.demo.model.Cart;
import com.fico.demo.repo.CartRepo;
import com.fico.demo.util.WebUrl;

@RestController
public class CartController {

	public static final Logger log = LoggerFactory.getLogger(CartController.class);

	@Autowired
	public CartRepo cartRepo;

	@RequestMapping(value = WebUrl.CART_LIST_SAVE, method = RequestMethod.POST)
	public ResponseEntity<List<Cart>> addCartList(@RequestBody List<Cart> cart) {
		List<Cart> cartList = cartRepo.save(cart);
		if (cartList != null && !cartList.isEmpty()) {
			return new ResponseEntity<>(cartList, HttpStatus.CREATED);
		}
		return new ResponseEntity(new CustomErrorType("Cart List is not saved"), HttpStatus.NOT_FOUND);
	}

	@RequestMapping(value = WebUrl.CART, method = RequestMethod.POST)
	public ResponseEntity<Cart> addCart(@RequestBody Cart cart) {
		Cart cart2 = cartRepo.findByProductName(cart.getProductName());
		Cart cartResponse;

		if (cart2 != null) {
			cart.setCartID(cart2.getCartID());
		}
		cartResponse = cartRepo.save(cart);

		if (cartResponse == null) {
			return new ResponseEntity(new CustomErrorType("Cart is not saved"), HttpStatus.NOT_FOUND);
		}
		return new ResponseEntity<>(cartResponse, HttpStatus.CREATED);
	}

	@RequestMapping(value = WebUrl.CART + "{cartID}", method = RequestMethod.DELETE)
	public ResponseEntity<Cart> deleteCart(@PathVariable int cartID) {
		Cart cart = cartRepo.findOne(cartID);
		if (cart == null) {
			return new ResponseEntity(new CustomErrorType("cartID: " + cartID + " not found."), HttpStatus.NOT_FOUND);
		}
		cartRepo.delete(cartID);
		return new ResponseEntity<>(cart, HttpStatus.OK);
	}

	@RequestMapping(value = WebUrl.CART, method = RequestMethod.GET)
	public ResponseEntity<List<Cart>> fetchCartList() {
		List<Cart> cartList = cartRepo.findAll();
		if (cartList != null && !cartList.isEmpty()) {
			return new ResponseEntity<>(cartList, HttpStatus.OK);
		}
		return new ResponseEntity(new CustomErrorType("Unable to find list"), HttpStatus.NO_CONTENT);
	}
}