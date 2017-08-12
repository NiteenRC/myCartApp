package com.fico.demo.controller;

import java.util.Date;
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
import com.fico.demo.model.PurchaseOrder;
import com.fico.demo.model.PurchaseOrderDetail;
import com.fico.demo.repo.OrderDetailRepo;
import com.fico.demo.repo.OrderRepo;
import com.fico.demo.util.Utility;
import com.fico.demo.util.WebUrl;
import com.fico.demo.vo.OrderVo;

@RestController
public class PurchaseOrderController {

	public static final Logger log = LoggerFactory.getLogger(PurchaseOrderController.class);

	@Autowired
	public OrderRepo orderRepo;

	@Autowired
	public OrderDetailRepo orderDetailRepo;

	@RequestMapping(value = WebUrl.ORDERS, method = RequestMethod.POST)
	public ResponseEntity<PurchaseOrder> addCartList(@RequestBody OrderVo orderVo) {
		PurchaseOrder order = orderVo.getPurchaseOrder();

		order.setOrderBookingDate(new Date());
		order.setOrderNo("ORDERNO" + Utility.nextSessionId());
		order.setUserID(orderVo.getUserID());
		PurchaseOrder oder = orderRepo.save(order);
		
		List<PurchaseOrderDetail> orderDetail = orderVo.getPurchaseOrderDetail();

		PurchaseOrderDetail purchaseOrderDetail = new PurchaseOrderDetail();
		purchaseOrderDetail.setOrder(oder);

		orderDetail.add(purchaseOrderDetail);

		orderDetailRepo.save(orderDetail);

		if (oder == null) {
			return new ResponseEntity(new CustomErrorType("Order is not done!!"), HttpStatus.NOT_FOUND);
		}
		return new ResponseEntity<>(oder, HttpStatus.CREATED);
	}

	@RequestMapping(value = WebUrl.ORDER, method = RequestMethod.POST)
	public ResponseEntity<PurchaseOrder> createOrder(@RequestBody PurchaseOrder purchaseOrder) {
		PurchaseOrder cartResponse = orderRepo.save(purchaseOrder);
		if (purchaseOrder == null) {
			return new ResponseEntity(new CustomErrorType("Order is not done!!"), HttpStatus.NOT_FOUND);
		}
		return new ResponseEntity<>(cartResponse, HttpStatus.CREATED);
	}
	
	@RequestMapping(value = WebUrl.ORDER_BY_ORDERNO, method = RequestMethod.GET)
	public ResponseEntity<PurchaseOrder> findByOrder(@PathVariable String orderNo) {
		PurchaseOrder po = orderRepo.findOneByOrderNo(orderNo);
		if (po != null && po.getOrderNo() != null) {
			return new ResponseEntity<>(po, HttpStatus.OK);
		}
		return new ResponseEntity(new CustomErrorType("Order is not done!!"), HttpStatus.NOT_FOUND);
	}
	
	@RequestMapping(value = WebUrl.ORDER, method = RequestMethod.GET)
	public ResponseEntity<List<PurchaseOrder>> findAllOrder() {
		List<PurchaseOrder> po = orderRepo.findAll();
		if (po != null && !po.isEmpty()) {
			return new ResponseEntity<>(po, HttpStatus.OK);
		}
		return new ResponseEntity(new CustomErrorType("Order is not done!!"), HttpStatus.NOT_FOUND);
	}

	@RequestMapping(value = WebUrl.ORDER_BY_USERID, method = RequestMethod.GET)
	public ResponseEntity<List<PurchaseOrder>> findAllOrdersByUser(@PathVariable String userID) {
		List<PurchaseOrder> productList = orderRepo.findAllOrdersByUserID(Integer.parseInt(userID));
		if (productList.isEmpty()) {
			return new ResponseEntity(new CustomErrorType("Unable to find list"), HttpStatus.NO_CONTENT);
		}
		return new ResponseEntity<>(productList, HttpStatus.OK);
	}
}