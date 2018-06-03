package org.tondu.bioevo.model;

/**
 * Describes BioEvo world, a representation of one timeline of events.
 *
 * @author Marko Urm
 */
public class World {

    private final long id;
    private int currentStep;
    
    public World(long id) {
        this.id = id;
    }
    
    public long getId() {
        return id;
    }

    public int getCurrentStep() {
        return currentStep;
    }
    
    public void setCurrentStep(int currentStep) {
        this.currentStep = currentStep;
    }
    
}
