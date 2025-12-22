package com.upgrad.bookmyconsultation.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.upgrad.bookmyconsultation.entity.Rating;
import com.upgrad.bookmyconsultation.service.AuthTokenService;
import com.upgrad.bookmyconsultation.entity.User;
import com.upgrad.bookmyconsultation.entity.UserAuthToken;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.when;
import com.upgrad.bookmyconsultation.service.RatingsService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import static org.mockito.Mockito.doNothing;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(RatingsController.class)
public class RatingsControllerTest {

	@Autowired
	private MockMvc mockMvc;

	@MockBean
	private RatingsService ratingsService;

	@MockBean
	private AuthTokenService authTokenService;



	@Test
	public void submitRatings_valid_returnsOk() throws Exception {
		Rating rating = new Rating();
		rating.setDoctorId("doc-1");
		rating.setRating(5);

		UserAuthToken token = new UserAuthToken();
		token.setUser(new User());
		token.getUser().setEmailId("test@test.com");
		when(authTokenService.validateToken(anyString())).thenReturn(token);
		doNothing().when(ratingsService).submitRatings(rating);

		mockMvc.perform(post("/ratings")
				.header("Authorization", "Bearer token")
				.contentType(MediaType.APPLICATION_JSON)
				.content(new ObjectMapper().writeValueAsString(rating)))
				.andExpect(status().isOk());
	}
}
