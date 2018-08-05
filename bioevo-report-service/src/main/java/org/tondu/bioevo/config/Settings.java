package org.tondu.bioevo.config;

import org.springframework.core.env.Environment;

/**
 * Holds custom configuration properties for the application.
 *
 * @author Marko Urm
 */
public class Settings {
    
    private static final String ALLOWED_CORS_ORIGINS_PROPERTY = "bioevo.service.crossorigin.origins";

    private final String[] allowedCorsOrigins;
    
    public Settings(Environment env) {
        allowedCorsOrigins = parseAllowedCorsOrigins( env );
    }
    
    public String[] getAllowedCorsOrigins() {
        return allowedCorsOrigins;
    }
    
    private String[] parseAllowedCorsOrigins(Environment env) {
        String origins = env.getRequiredProperty( ALLOWED_CORS_ORIGINS_PROPERTY );
        return origins.split( "," );
    }
    
}
