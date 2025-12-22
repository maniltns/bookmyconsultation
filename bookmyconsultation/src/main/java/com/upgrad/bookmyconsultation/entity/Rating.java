package com.upgrad.bookmyconsultation.entity;

import javax.persistence.Entity;
import javax.persistence.Id;
import java.util.UUID;

@Entity
public class Rating {
	@Id
	private String id = UUID.randomUUID().toString();
	private String appointmentId;
	private String doctorId;
	private Integer rating;
	private String comments;
	public String getId() { return id; }
	public void setId(String id) { this.id = id; }
	public String getAppointmentId() { return appointmentId; }
	public void setAppointmentId(String appointmentId) { this.appointmentId = appointmentId; }
	public String getDoctorId() { return doctorId; }
	public void setDoctorId(String doctorId) { this.doctorId = doctorId; }
	public Integer getRating() { return rating; }
	public void setRating(Integer rating) { this.rating = rating; }
	public String getComments() { return comments; }
	public void setComments(String comments) { this.comments = comments; }
}
	
