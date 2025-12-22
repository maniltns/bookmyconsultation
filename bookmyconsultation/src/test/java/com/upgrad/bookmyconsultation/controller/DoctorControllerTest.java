package com.upgrad.bookmyconsultation.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.upgrad.bookmyconsultation.entity.Address;
import com.upgrad.bookmyconsultation.entity.Doctor;
import com.upgrad.bookmyconsultation.enums.Speciality;
import com.upgrad.bookmyconsultation.service.AuthTokenService;
import com.upgrad.bookmyconsultation.service.DoctorService;
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
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(DoctorController.class)
public class DoctorControllerTest {

	@Autowired
	private MockMvc mockMvc;

	@MockBean
	private DoctorService doctorService;

	@MockBean
	private AuthTokenService authTokenService;

	@Test
	public void registerDoctor_valid_returnsDoctor() throws Exception {
		Doctor doctor = new Doctor();
		doctor.setId(UUID.randomUUID().toString());
		doctor.setFirstName("John");
		doctor.setLastName("Doe");
		doctor.setSpeciality(Speciality.CARDIOLOGIST);
		doctor.setAddress(new Address());

		when(doctorService.register(any(Doctor.class))).thenReturn(doctor);

		mockMvc.perform(post("/doctors")
				.contentType(MediaType.APPLICATION_JSON)
				.content(new ObjectMapper().writeValueAsString(doctor)))
				.andExpect(status().isOk());
	}

	@Test
	public void getDoctor_valid_returnsDoctor() throws Exception {
		String id = "doc-1";
		Doctor doctor = new Doctor();
		doctor.setId(id);
		when(doctorService.getDoctor(id)).thenReturn(doctor);

		mockMvc.perform(get("/doctors/" + id))
				.andExpect(status().isOk());
	}
}
