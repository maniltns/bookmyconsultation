package com.upgrad.bookmyconsultation.controller;

import com.upgrad.bookmyconsultation.entity.Appointment;
import com.upgrad.bookmyconsultation.exception.InvalidInputException;
import com.upgrad.bookmyconsultation.exception.SlotUnavailableException;
import com.upgrad.bookmyconsultation.service.AppointmentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/appointments")
public class AppointmentController {

	@Autowired
	private AppointmentService appointmentService;


	@PostMapping
	public ResponseEntity<String> bookAppointment(@RequestBody Appointment appointment) throws InvalidInputException, SlotUnavailableException {
		return ResponseEntity.ok(appointmentService.appointment(appointment));
	}

	@GetMapping("/{appointmentId}")
	public ResponseEntity<Appointment> getAppointment(@PathVariable("appointmentId") String appointmentId) {
		return ResponseEntity.ok(appointmentService.getAppointment(appointmentId));
	}
	
	

}