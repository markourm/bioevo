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
import org.tondu.bioevo.model.World;

/**
 * Integration tests for BioEvo Report Service.
 *
 * @author Marko Urm
 */
@ExtendWith(SpringExtension.class)
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
public class BioEvoReportServiceTest {
    
    private static final String REPORT_GET_WORLDS_URL = "/v1/report/world";
    private static final String REPORT_GET_WORLD_URL = "/v1/report/world/{worldId}";
    private static final String REPORT_GET_WORLD_STEP_URL = "/v1/report/world/{worldId}/{stepId}";
    
    @Autowired
    private TestRestTemplate template;
    
    @Test
    public void shouldGetWorlds() {
        //given
        int worldId1 = 1;
        int stepId1 = 1;
        
        int worldId2 = 5;
        int stepId2 = 30;
        
        //when
        ResponseEntity<World[]> response = template.getForEntity( REPORT_GET_WORLDS_URL, World[].class );
        
        //then
        assertThat( response.getStatusCode() ).isEqualTo( HttpStatus.OK );
        
        World[] worlds = response.getBody();
        assertThat( worlds.length ).isEqualTo( 2 );
        
        assertThat( worlds[0].getId() ).isEqualTo( worldId1 );
        assertThat( worlds[0].getCurrentStepId() ).isEqualTo( stepId1 );
        
        assertThat( worlds[1].getId() ).isEqualTo( worldId2 );
        assertThat( worlds[1].getCurrentStepId() ).isEqualTo( stepId2 );
    }
    
    @Test
    public void shouldGetWorldState() {
        //given
        int worldId = 3;
        int expectedStepId = 1;
        
        //when
        ResponseEntity<World> response = template.getForEntity( REPORT_GET_WORLD_URL, World.class, worldId );
        
        //then
        assertThat( response.getStatusCode() ).isEqualTo( HttpStatus.OK );
        
        World world = response.getBody();
        assertThat( world.getId() ).isEqualTo( worldId );
        assertThat( world.getCurrentStepId() ).isEqualTo( expectedStepId );
    }
    
    @Test
    public void shouldGetWorldStateInGivenStep() {
        //given
        int worldId = 3;
        int stepId = 5;
        
        //when
        ResponseEntity<World> response = template.getForEntity( REPORT_GET_WORLD_STEP_URL, World.class, worldId, stepId );
        
        //then
        assertThat( response.getStatusCode() ).isEqualTo( HttpStatus.OK );
        
        World world = response.getBody();
        assertThat( world.getId() ).isEqualTo( worldId );
        assertThat( world.getCurrentStepId() ).isEqualTo( stepId );
    }
    
}
