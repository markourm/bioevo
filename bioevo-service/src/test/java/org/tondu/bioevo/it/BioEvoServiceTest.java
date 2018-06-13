package org.tondu.bioevo.it;

import static org.assertj.core.api.Assertions.assertThat;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import org.tondu.bioevo.api.request.CreateWorldRequest;
import org.tondu.bioevo.api.request.DoStepsRequest;
import org.tondu.bioevo.api.response.CreateWorldResponse;
import org.tondu.bioevo.api.response.DoStepsResponse;

/**
 * Integration tests for BioEvo Service.
 *
 * @author Marko Urm
 */
@ExtendWith(SpringExtension.class)
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
public class BioEvoServiceTest {
    
    private static final String TIMESTEP_URL = "/v1/{worldId}/step/{steps}";
    private static final String TIMESTEP_STEPS_URL = "/v1/{worldId}/step";
    private static final String CREATE_WORLD_URL = "/v1/world";
    
    private static final String EXPECTED_TIMESTEP_MESSAGE = "Started calculating next %d step(s)";
    
    @Autowired
    private TestRestTemplate template;

    @Test
    public void shouldDoGivenNumberOfSteps() {
        //given
        int worldId = 3;
        int steps = 5;
        String expectedMessage = String.format( EXPECTED_TIMESTEP_MESSAGE, steps );
        
        //when
        ResponseEntity<DoStepsResponse> response = template.postForEntity( TIMESTEP_URL, null, DoStepsResponse.class, worldId, steps );
        
        //then
        assertThat( response.getStatusCode() ).isEqualTo( HttpStatus.OK );
        
        DoStepsResponse doStepResponse = response.getBody();
        assertThat( doStepResponse.getMessage() ).isEqualTo( expectedMessage );
    }
    
    @Test
    public void shouldDoStepsWithCriteria() {
        //given
        int worldId = 3;
        int steps = 5;
        DoStepsRequest request = new DoStepsRequest();
        request.setStepCount( steps );
        
        String expectedMessage = String.format( EXPECTED_TIMESTEP_MESSAGE, steps );
        
        //when
        ResponseEntity<DoStepsResponse> response = template.postForEntity( TIMESTEP_STEPS_URL, request, DoStepsResponse.class, worldId );
        
        //then
        assertThat( response.getStatusCode() ).isEqualTo( HttpStatus.OK );
        
        DoStepsResponse doStepResponse = response.getBody();
        assertThat( doStepResponse.getMessage() ).isEqualTo( expectedMessage );        
    }
    
    @Test
    public void shouldCreateWorld() {
        //given
        long expectedWorldId = 1L;
        CreateWorldRequest request = new CreateWorldRequest();
        
        //when
        ResponseEntity<CreateWorldResponse> response = template.postForEntity( CREATE_WORLD_URL, request, CreateWorldResponse.class );
        
        //then
        assertThat( response.getStatusCode() ).isEqualTo( HttpStatus.CREATED );
        
        CreateWorldResponse createWorldResponse = response.getBody();
        assertThat( createWorldResponse.getWorldId() ).isEqualTo( expectedWorldId );
        assertThat( createWorldResponse.getMessage() ).isNull();
    }
    
}
