package org.tondu.bioevo.api.response;

/**
 * Generic response for create / update world requests.
 *
 * @author Marko Urm
 */
public class WorldResponse {
  
    private String message;    
    private long worldId;
    
    public String getMessage() {
        return message;
    }
    
    public void setMessage(String message) {
        this.message = message;
    }
    
    public long getWorldId() {
        return worldId;
    }
    
    public void setWorldId(long worldId) {
        this.worldId = worldId;
    }

    @Override
    public String toString() {
        return "WorldResponse [message=" + message + ", worldId=" + worldId + "]";
    }
    
}
