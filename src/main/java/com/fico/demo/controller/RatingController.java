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
import com.fico.demo.model.Product;
import com.fico.demo.model.Rating;
import com.fico.demo.repo.RatingRepo;
import com.fico.demo.util.WebUrl;

@RestController
public class RatingController {

	public static final Logger log = LoggerFactory.getLogger(RatingController.class);

	@Autowired
	public RatingRepo ratingRepo;

	@RequestMapping(value = WebUrl.RATING + "{productID}", method = RequestMethod.POST)
	public ResponseEntity<Rating> addRating(@RequestBody Rating rating, @PathVariable int productID) {

		Rating userResponse = ratingRepo.findByEmailIdAndProductProductID(rating.getEmailId(), productID);
		if (userResponse != null) {
			return new ResponseEntity(new CustomErrorType("You are already rated for this product!!"), HttpStatus.FOUND);
		}

		Product product = new Product();
		product.setProductID(productID);

		rating.setProduct(product);
		Rating cartResponse = ratingRepo.save(rating);
		if (cartResponse == null) {
			return new ResponseEntity(new CustomErrorType("Rating is not saved"), HttpStatus.NOT_FOUND);
		}
		return new ResponseEntity<>(cartResponse, HttpStatus.CREATED);
	}

	@RequestMapping(value = WebUrl.RATING, method = RequestMethod.GET)
	public ResponseEntity<List<Rating>> cartList() {
		List<Rating> ratingList = ratingRepo.findAll();
		if (ratingList == null) {
			return new ResponseEntity(new CustomErrorType("Unable to find list"), HttpStatus.NO_CONTENT);
		}
		return new ResponseEntity<>(ratingList, HttpStatus.OK);
	}
}