package com.fico.demo.util;

public interface WebUrl {

	String PRODUCT = "/product";
	String PRODUCT_SAVE_PRODUCT_LIST = "/product/saveProducts";
	String PRODUCT_BY_NAME = "/product/byName/";
	String PRODUCTS_BY_SORT = "/product/bySort/";
	String PRODUCT_BY_CATEGORY_ID = "/product/category/";
	String PRODUCT_FOR_ALL_CATEGORIES = "/products";

	String CART = "/cart/";
	String CART_LIST_SAVE = "/cart/saveCarts";

	String CATEGORY_BY_NAME = "/category/byName/";
	String CATEGORY = "/category";
	String CATEGORY_BY_PRODUCT_COUNT = "/category/productCount";
	
	String ORDER = "/order/";
	String ORDER_BY_USER = "/order/byUser/";
	String ORDER_LIST_SAVE = "/order/saveOrders";
	
	String RATING = "/rating/";
	
	
}
