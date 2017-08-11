package com.fico.demo.repo;

import org.springframework.data.jpa.repository.JpaRepository;

import com.fico.demo.model.PurchaseOrder;

public interface OrderRepo extends JpaRepository<PurchaseOrder, Integer> {

	PurchaseOrder findOneByOrderNo(String orderNo);

}
