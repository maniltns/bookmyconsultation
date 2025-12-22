package com.upgrad.bookmyconsultation.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.upgrad.bookmyconsultation.entity.User;
import com.upgrad.bookmyconsultation.service.AppointmentService;
import com.upgrad.bookmyconsultation.service.AuthTokenService;
import com.upgrad.bookmyconsultation.service.UserService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(UserAdminController.class)
public class UserAdminControllerTest {

	@Autowired
	private MockMvc mockMvc;

	@MockBean
	private UserService userService;

	@MockBean
	private AuthTokenService authTokenService;

	@MockBean
	private AppointmentService appointmentService;

	@Test
	public void createUser_valid_returnsUser() throws Exception {
		User user = new User();
		user.setEmailId("test@test.com");
		user.setPassword("password");
		user.setFirstName("First");
		user.setLastName("Last");
		user.setMobile("1234567890");

		when(userService.register(any(User.class))).thenReturn(user);

		mockMvc.perform(post("/users/register")
				.contentType(MediaType.APPLICATION_JSON)
				.content(new ObjectMapper().writeValueAsString(user)))
				.andExpect(status().isOk());
	}
}
