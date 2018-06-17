package org.tondu.bioevo.model;

/**
 * Describes BioEvo world, a representation of one timeline of events.
 *
 * @author Marko Urm
 */
public class World {

    private long id;
    private int currentStepId = 1;
    
    public World() {}
    
    public World(long id) {
        this.id = id;
    }
    
    public long getId() {
        return id;
    }
    
    public void setId(long id) {
        this.id = id;
    }

    public int getCurrentStepId() {
        return currentStepId;
    }
    
    public void setCurrentStepId(int currentStepId) {
        this.currentStepId = currentStepId;
    }

    @Override
    public String toString() {
        return "World [id=" + id + ", currentStepId=" + currentStepId + "]";
    }
    
}
