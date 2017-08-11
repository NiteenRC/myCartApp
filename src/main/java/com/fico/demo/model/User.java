package com.fico.demo.model;

import java.io.Serializable;

import javax.persistence.*;

/**
 * The persistent class for the USER database table.
 */
@Entity
// @Table(name = "USER", schema = "SMARTSHOP")
/// @NamedQuery(name = "User.findAll", query = "SELECT u FROM User u")
public class User implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue
	@Column(name = "USER_ID")
	private int userId;

	@Column(name = "USER_EMAIL")
	private String userEmail;

	@Column(name = "USER_FIRST_NAME")
	private String userFirstName;

	@Column(name = "USER_LAST_NAME")
	private String userLastName;

	@Column(name = "USER_PASSWORD")
	private String userPassword;

	@Column(name = "USER_USER_NAME")
	private String userName;

	@Column(name = "USER_ADDRESS")
	private String userAddress;

	@Column(name = "USER_CITY")
	private String userCity;

	@Column(name = "USER_PINCODE")
	private String userPincode;

	@Column(name = "USER_STATE")
	private String userState;

	@Column(name = "USER_TYPE")
	private String userType;

	/**
	 * 
	 * Constructor: create a new User.
	 */
	public User() {
	}

	/**
	 * 
	 * TODO
	 * 
	 * @return
	 */
	public int getUserId() {
		return this.userId;
	}

	/**
	 * 
	 * TODO
	 * 
	 * @param userId
	 */
	public void setUserId(int userId) {
		this.userId = userId;
	}

	/**
	 * 
	 * TODO
	 * 
	 * @return
	 */
	public String getUserEmail() {
		return this.userEmail;
	}

	/**
	 * 
	 * TODO
	 * 
	 * @param userEmail
	 */
	public void setUserEmail(String userEmail) {
		this.userEmail = userEmail;
	}

	/**
	 * TODO
	 * 
	 * @return
	 */
	public String getUserFirstName() {
		return this.userFirstName;
	}

	/**
	 * TODO
	 * 
	 * @param userFirstName
	 */
	public void setUserFirstName(String userFirstName) {
		this.userFirstName = userFirstName;
	}

	/**
	 * TODO
	 * 
	 * @return
	 */
	public String getUserLastName() {
		return this.userLastName;
	}

	/**
	 * TODO
	 * 
	 * @param userLastName
	 */
	public void setUserLastName(String userLastName) {
		this.userLastName = userLastName;
	}

	/**
	 * TODO
	 * 
	 * @return
	 */
	public String getUserPassword() {
		return this.userPassword;
	}

	/**
	 * TODO
	 * 
	 * @param userPassword
	 */
	public void setUserPassword(String userPassword) {
		this.userPassword = userPassword;
	}

	/**
	 * TODO
	 * 
	 * @return
	 */
	public String getUserName() {
		return this.userName;
	}

	/**
	 * TODO
	 * 
	 * @param userSurname
	 */
	public void setUserName(String userName) {
		this.userName = userName;
	}

	/**
	 * Get the userAddress.
	 *
	 * @return Returns the userAddressLine1 as a String.
	 */
	public String getUserAddress() {
		return userAddress;
	}

	/**
	 * Set the userAddress to the specified value.
	 *
	 * @param userAddress
	 *            The userAddressLine1 to set.
	 */
	public void setUserAddress(String userAddress) {
		this.userAddress = userAddress;
	}

	/**
	 * Get the userCity.
	 *
	 * @return Returns the userCity as a String.
	 */
	public String getUserCity() {
		return userCity;
	}

	/**
	 * Set the userCity to the specified value.
	 *
	 * @param userCity
	 *            The userCity to set.
	 */
	public void setUserCity(String userCity) {
		this.userCity = userCity;
	}

	/**
	 * Get the userPincode.
	 *
	 * @return Returns the userPincode as a int.
	 */
	public String getUserPincode() {
		return userPincode;
	}

	/**
	 * Set the userPincode to the specified value.
	 *
	 * @param userPincode
	 *            The userPincode to set.
	 */
	public void setUserPincode(String userPincode) {
		this.userPincode = userPincode;
	}

	/**
	 * Get the userState.
	 *
	 * @return Returns the userState as a String.
	 */
	public String getUserState() {
		return userState;
	}

	/**
	 * Set the userState to the specified value.
	 *
	 * @param userState
	 *            The userState to set.
	 */
	public void setUserState(String userState) {
		this.userState = userState;
	}

	/**
	 * TODO
	 * 
	 * @return
	 */
	public String getUserType() {
		return this.userType;
	}

	/**
	 * TODO
	 * 
	 * @param userType
	 */
	public void setUserType(String userType) {
		this.userType = userType;
	}

}