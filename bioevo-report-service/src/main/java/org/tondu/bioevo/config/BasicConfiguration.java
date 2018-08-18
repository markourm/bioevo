package org.tondu.bioevo.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.env.Environment;

/**
 * Basic configuration for the application.
 *
 * @author Marko Urm
 */
@Configuration
public class BasicConfiguration {

    @Bean
    public Settings settings(Environment env) {
        return new Settings( env );
    }
    
}
