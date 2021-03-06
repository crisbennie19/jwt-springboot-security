package com.starkmark.entities;

import javax.persistence.Entity;
import javax.persistence.Id;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
 
public class User {

	@Id
	private int id;
	private String userName;
	private String password;
	private String email;
}
