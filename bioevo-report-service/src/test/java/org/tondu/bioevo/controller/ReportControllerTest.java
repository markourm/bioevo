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

/**
 * Tests for {@link ReportController}.
 *
 * @author Marko Urm
 */
@ExtendWith(SpringExtension.class)
@WebMvcTest
public class ReportControllerTest {

    private static final String REPORT_GET_URL = "/v1/report/{worldId}/{stepId}";

    @Autowired
    private MockMvc mvc;
    
    @Test
    public void shouldGetWorldState() throws Exception {
        //given
        int worldId = 3;
        int stepId = 5;
        
        //when
        mvc.perform( MockMvcRequestBuilders.get( REPORT_GET_URL, worldId, stepId )
                                            .accept( MediaType.APPLICATION_JSON ) )
        //then
                                            .andExpect( status().isOk() )
                                            .andExpect( content().contentType( MediaType.APPLICATION_JSON_UTF8 ) )
                                            .andExpect( jsonPath( "$.id" ).value( worldId ) )
                                            .andExpect( jsonPath( "$.currentStepId" ).value( stepId ) );
    }
    
}
