package org.tondu.bioevo.controller;

import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.http.MediaType;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.tondu.bioevo.api.request.StepCriteria;

import com.fasterxml.jackson.databind.ObjectMapper;

/**
 * Tests for {@link TimeStepController}.
 *
 * @author Marko Urm
 */
@ExtendWith(SpringExtension.class)
@WebMvcTest
public class TimeStepControllerTest {
    
    private static final String TIMESTEP_POST_URL = "/v1/{worldId}/step";
    private static final String TIMESTEP_GET_URL = "/v1/{worldId}/step/{steps}";
    
    private static final String EXPECTED_MESSAGE = "Started calculating next %d step(s)";

    @Autowired
    private MockMvc mvc;
    
    @Autowired
    private ObjectMapper jackson;
    
    @Test
    public void shouldDoGivenNumberOfSteps() throws Exception {
        //given
        int worldId = 3;
        int steps = 5;
        String expectedMessage = String.format( EXPECTED_MESSAGE, steps );
        
        //when
        mvc.perform( MockMvcRequestBuilders.get( TIMESTEP_GET_URL, worldId, steps )
                                            .accept( MediaType.APPLICATION_JSON ) )
        //then
                                            .andExpect( status().isOk() )
                                            .andExpect( content().contentType( MediaType.APPLICATION_JSON_UTF8 ) )
                                            .andExpect( jsonPath( "$.message" ).value( expectedMessage ) );
    }
    
    @Test
    public void shouldDoStepsWithCriteria() throws Exception {
        //given
        int worldId = 3;
        int steps = 5;
        StepCriteria criteria = new StepCriteria();
        criteria.setStepCount( steps );
        String body = jackson.writeValueAsString( criteria );
        
        String expectedMessage = String.format( EXPECTED_MESSAGE, steps );
        
        //when
        mvc.perform( MockMvcRequestBuilders.post( TIMESTEP_POST_URL, worldId )
                                            .contentType( MediaType.APPLICATION_JSON_UTF8 )
                                            .content( body )
                                            .accept( MediaType.APPLICATION_JSON ) )
                                            
        //then
                                            .andExpect( status().isOk() )
                                            .andExpect( content().contentType( MediaType.APPLICATION_JSON_UTF8 ) )
                                            .andExpect( jsonPath( "$.message" ).value( expectedMessage ) );
    }
    
}
