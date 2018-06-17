package org.tondu.bioevo.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;
import org.tondu.bioevo.api.request.CreateWorldRequest;
import org.tondu.bioevo.api.response.CreateWorldResponse;

/**
 * Controller handling requests to create a new world.
 *
 * @author Marko Urm
 */
@RestController
@CrossOrigin("${bioevo.service.crossorigin.origins}")
@RequestMapping(value = "/v1/world")
public class WorldController {

    private static final Logger LOG = LoggerFactory.getLogger( WorldController.class );
    
    @PostMapping
    @ResponseStatus( HttpStatus.CREATED )
    public CreateWorldResponse createWorld(@RequestBody(required = false) CreateWorldRequest request) {
        LOG.info( "Received create new world request: {}", request );
        return createFrom( request );
    }
    
    private CreateWorldResponse createFrom(CreateWorldRequest request) {
        CreateWorldResponse response = new CreateWorldResponse();
        response.setWorldId( 1 );
        return response;
    }
    
}
