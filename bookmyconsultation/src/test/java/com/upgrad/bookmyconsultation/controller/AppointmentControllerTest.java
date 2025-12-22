package com.upgrad.bookmyconsultation.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.upgrad.bookmyconsultation.entity.Appointment;
import com.upgrad.bookmyconsultation.service.AppointmentService;
import com.upgrad.bookmyconsultation.service.AuthTokenService;
import com.upgrad.bookmyconsultation.entity.User;
import com.upgrad.bookmyconsultation.entity.UserAuthToken;
import static org.mockito.ArgumentMatchers.anyString;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import java.util.UUID;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(AppointmentController.class)
public class AppointmentControllerTest {

	@Autowired
	private MockMvc mockMvc;

	@MockBean
	private AppointmentService appointmentService;

	@MockBean
	private AuthTokenService authTokenService;



// inside test class
	@Test
	public void bookAppointment_valid_returnsId() throws Exception {
		Appointment appointment = new Appointment();
		appointment.setAppointmentId(UUID.randomUUID().toString());
		appointment.setUserEmailId("test@test.com");
		appointment.setDoctorId("doc-1");
		appointment.setTimeSlot("10:00 AM");
		appointment.setAppointmentDate("2023-10-10");

		UserAuthToken token = new UserAuthToken();
		token.setUser(new User());
		token.getUser().setEmailId("test@test.com");
		when(authTokenService.validateToken(anyString())).thenReturn(token);
		when(appointmentService.appointment(any(Appointment.class))).thenReturn(appointment.getAppointmentId());

		mockMvc.perform(post("/appointments")
				.header("Authorization", "Bearer token")
				.contentType(MediaType.APPLICATION_JSON)
				.content(new ObjectMapper().writeValueAsString(appointment)))
				.andExpect(status().isOk())
				.andExpect(content().string(appointment.getAppointmentId()));
	}

	@Test
	public void getAppointment_valid_returnsAppointment() throws Exception {
		String id = "app-1";
		Appointment appointment = new Appointment();
		appointment.setAppointmentId(id);
		
		UserAuthToken token = new UserAuthToken();
		token.setUser(new User());
		token.getUser().setEmailId("test@test.com");
		when(authTokenService.validateToken(anyString())).thenReturn(token);
		when(appointmentService.getAppointment(id)).thenReturn(appointment);

		mockMvc.perform(get("/appointments/" + id)
				.header("Authorization", "Bearer token"))
				.andExpect(status().isOk());
	}
}
