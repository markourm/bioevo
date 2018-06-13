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
import org.tondu.bioevo.api.request.CreateWorldRequest;

import com.fasterxml.jackson.databind.ObjectMapper;

/**
 * Tests for {@link WorldController}.
 *
 * @author Marko Urm
 */
@ExtendWith(SpringExtension.class)
@WebMvcTest
public class WorldControllerTest {

    private static final String CREATE_WORLD_URL = "/v1/world";

    @Autowired
    private MockMvc mvc;
    
    @Autowired
    private ObjectMapper jackson;
    
    @Test
    public void shouldCreateWorldWithGivenDescription() throws Exception {
        //given
        long expectedWorldId = 1L;
        CreateWorldRequest request = new CreateWorldRequest();
        String body = jackson.writeValueAsString( request );
        
        //when
        mvc.perform( MockMvcRequestBuilders.post( CREATE_WORLD_URL )
                                            .accept( MediaType.APPLICATION_JSON )
                                            .contentType( MediaType.APPLICATION_JSON_UTF8 )
                                            .content( body ) )
        //then
                                            .andExpect( status().isCreated() )
                                            .andExpect( content().contentType( MediaType.APPLICATION_JSON_UTF8 ) )
                                            .andExpect( jsonPath( "$.worldId" ).value( expectedWorldId ) );
    }
    
    @Test
    public void shouldHandleRequestWithoutBody() throws Exception {
        //given
        long expectedWorldId = 1L;
        
        //when
        mvc.perform( MockMvcRequestBuilders.post( CREATE_WORLD_URL )
                                            .accept( MediaType.APPLICATION_JSON ) )
        //then
                                            .andExpect( status().isCreated() )
                                            .andExpect( content().contentType( MediaType.APPLICATION_JSON_UTF8 ) )
                                            .andExpect( jsonPath( "$.worldId" ).value( expectedWorldId ) );
    }
    
}
