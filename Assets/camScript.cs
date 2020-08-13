using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class camScript : MonoBehaviour
{
    
    public bool isMoving = false;
    public float rotationTime = 5f;
    public float remainingRotationTime=0f;

        // Start is called before the first frame update
    void Start()
    {
        transform.LookAt(GameObject.Find("Cube").transform);
    }

    public void Rotate(){
        if(remainingRotationTime<rotationTime*2){
            remainingRotationTime+=rotationTime;
        }
        if(!isMoving){
            isMoving=true;
            StartCoroutine("RotateCoroutine");
        }
    }

    IEnumerator RotateCoroutine(){
        while(remainingRotationTime > 0) 
        {
            transform.LookAt(GameObject.Find("Cube").transform);
            transform.Translate(Vector3.right * Time.deltaTime);
            remainingRotationTime -= Time.deltaTime; 
            yield return null;
        }
        isMoving=false;
    }
}
