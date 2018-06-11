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
import org.tondu.bioevo.api.response.DoStepResponse;
import org.tondu.bioevo.model.StepCriteria;
import org.tondu.bioevo.model.World;

/**
 * Integration tests for BioEvo service.
 *
 * @author Marko Urm
 */
@ExtendWith(SpringExtension.class)
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
public class BioEvoServiceTest {
    
    private static final String TIMESTEP_GET_URL = "/v1/{worldId}/step/{steps}";
    private static final String TIMESTEP_POST_URL = "/v1/{worldId}/step";
    private static final String REPORT_GET_URL = "/v1/report/{worldId}/{stepId}";
    
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
        ResponseEntity<DoStepResponse> response = template.getForEntity( TIMESTEP_GET_URL, DoStepResponse.class, worldId, steps );
        
        //then
        assertThat( response.getStatusCode() ).isEqualTo( HttpStatus.OK );
        
        DoStepResponse doStepResponse = response.getBody();
        assertThat( doStepResponse.getMessage() ).isEqualTo( expectedMessage );
    }
    
    @Test
    public void shouldDoStepsWithCriteria() {
        //given
        int worldId = 3;
        int steps = 5;
        StepCriteria criteria = new StepCriteria();
        criteria.setStepCount( steps );
        
        String expectedMessage = String.format( EXPECTED_TIMESTEP_MESSAGE, steps );
        
        //when
        ResponseEntity<DoStepResponse> response = template.postForEntity( TIMESTEP_POST_URL, criteria, DoStepResponse.class, worldId );
        
        //then
        assertThat( response.getStatusCode() ).isEqualTo( HttpStatus.OK );
        
        DoStepResponse doStepResponse = response.getBody();
        assertThat( doStepResponse.getMessage() ).isEqualTo( expectedMessage );        
    }
    
    @Test
    public void shouldGetWorldState() {
        //given
        int worldId = 3;
        int stepId = 5;
        
        //when
        ResponseEntity<World> response = template.getForEntity( REPORT_GET_URL, World.class, worldId, stepId );
        
        //then
        assertThat( response.getStatusCode() ).isEqualTo( HttpStatus.OK );
        
        World world = response.getBody();
        assertThat( world.getId() ).isEqualTo( worldId );
        assertThat( world.getCurrentStepId() ).isEqualTo( stepId );
    }
    
}
