using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class cubeScript : MonoBehaviour
{
    public Texture[] textures;
    public int currentTexture;

    // Start is called before the first frame update
    void Start()
    {
    }

    // Update is called once per frame
    void Update()
    {
        if(Input.GetKeyDown(KeyCode.Space)){
            SwitchTexture();
        }
    }

    public void SwitchTexture(){
        currentTexture++;
        currentTexture %= textures.Length;
        GetComponent<Renderer>().material.mainTexture = textures[currentTexture];
    }

}
