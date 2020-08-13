using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class apiManager : MonoBehaviour
{
    cubeScript cubescript;
    GameObject hat;
 
    void Start(){
        hat = GameObject.Find("Hat");
        GameObject cube = GameObject.Find("Cube");
        cubescript = (cubeScript) cube.GetComponent(typeof(cubeScript));
    }

    public void setParameter(string value){
        Debug.Log("setParameter "+value);
        if(value.StartsWith("texture:")){
            cubescript.SwitchTexture();
        }
        else if(value.StartsWith("hat:")){
            hat.SetActive(!hat.activeSelf);
        }
    }

    public void testSetter(){
        setParameter("texture:toto");
    }
}
