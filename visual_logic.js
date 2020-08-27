/**
 * Generated by Verge3D Puzzles v.3.3.1
 * Thu Aug 27 2020 12:10:05 GMT+0200 (heure d’été d’Europe centrale)
 * Prefer not editing this file as your changes may get overridden once Puzzles are saved.
 * Check out https://www.soft8soft.com/docs/manual/en/introduction/Using-JavaScript.html
 * for the information on how to add your own JavaScript to Verge3D apps.
 */

'use strict';

(function() {

// global variables/constants used by puzzles' functions
var _pGlob = {};

_pGlob.objCache = {};
_pGlob.fadeAnnotations = true;
_pGlob.objClickCallbacks = [];
_pGlob.pickedObject = '';
_pGlob.objHoverCallbacks = [];
_pGlob.hoveredObject = '';
_pGlob.objMovementInfos = {};
_pGlob.objDragOverCallbacks = [];
_pGlob.objDragOverInfoByBlock = {}
_pGlob.dragMoveOrigins = {};
_pGlob.dragScaleOrigins = {};
_pGlob.mediaElements = {};
_pGlob.loadedFiles = {};
_pGlob.loadedFile = '';
_pGlob.promiseValue = '';
_pGlob.animMixerCallbacks = [];
_pGlob.arHitPoint = new v3d.Vector3(0, 0, 0);
_pGlob.states = [];
_pGlob.percentage = 0;
_pGlob.animateParamUpdate = null;
_pGlob.openedFile = '';
_pGlob.xrSessionAcquired = false;
_pGlob.xrSessionCallbacks = [];
_pGlob.screenCoords = new v3d.Vector2();
_pGlob.gamepadIndex = 0;

_pGlob.AXIS_X = new v3d.Vector3(1, 0, 0);
_pGlob.AXIS_Y = new v3d.Vector3(0, 1, 0);
_pGlob.AXIS_Z = new v3d.Vector3(0, 0, 1);
_pGlob.MIN_DRAG_SCALE = 10e-4;
_pGlob.SET_OBJ_ROT_EPS = 1e-8;

_pGlob.vec2Tmp = new v3d.Vector2();
_pGlob.vec2Tmp2 = new v3d.Vector2();
_pGlob.vec3Tmp = new v3d.Vector3();
_pGlob.vec3Tmp2 = new v3d.Vector3();
_pGlob.vec3Tmp3 = new v3d.Vector3();
_pGlob.vec3Tmp4 = new v3d.Vector3();
_pGlob.eulerTmp = new v3d.Euler();
_pGlob.eulerTmp2 = new v3d.Euler();
_pGlob.quatTmp = new v3d.Quaternion();
_pGlob.quatTmp2 = new v3d.Quaternion();
_pGlob.colorTmp = new v3d.Color();
_pGlob.mat4Tmp = new v3d.Matrix4();
_pGlob.planeTmp = new v3d.Plane();
_pGlob.raycasterTmp = new v3d.Raycaster();
_pGlob.intervals = {};

_pGlob.wooProductInfo = {};

var _pPhysics = {};

_pPhysics.tickCallbacks = [];
_pPhysics.syncList = [];

// internal info
_pPhysics.collisionData = [];

// goes to collision callback
_pPhysics.collisionInfo = {
    objectA: '',
    objectB: '',
    distance: 0,
    positionOnA: [0, 0, 0],
    positionOnB: [0, 0, 0],
    normalOnB: [0, 0, 0]
};

var PL = v3d.PL = v3d.PL || {};

// a more readable alias for PL (stands for "Puzzle Logic")
v3d.puzzles = PL;

PL.procedures = PL.procedures || {};

PL.execInitPuzzles = function(options) {
    // always null, should not be available in "init" puzzles
    var appInstance = null;

    var _initGlob = {};
    _initGlob.percentage = 0;
    _initGlob.output = {
        initOptions: {
            fadeAnnotations: true,
            useBkgTransp: false,
            preserveDrawBuf: false,
            useCompAssets: false,
            useFullscreen: true,
            useCustomPreloader: false,
            preloaderStartCb: function() {},
            preloaderProgressCb: function() {},
            preloaderEndCb: function() {},
        }
    }

    // provide the container's id to puzzles that need access to the container
    _initGlob.container = options !== undefined && 'container' in options
            ? options.container : "";

    

    
// loadFont puzzle
function loadFont(url, family) {

    if (!url || !family)
        return;

    // register in CSS
    var elemStyle = document.createElement('style');
    elemStyle.innerHTML = '@font-face { font-family: ' + family
        + '; src: url(' + url + '); }';
    document.body.appendChild(elemStyle);

    // preload font
    var elemDiv = document.createElement('div');
    elemDiv.innerHTML = 'invisible text';
    elemDiv.style.visibility = 'hidden';
    elemDiv.style.fontFamily = family;
    document.body.appendChild(elemDiv);
}



// utility functions envoked by the HTML puzzles
function getElements(ids, isParent) {
    var elems = [];
    if (Array.isArray(ids) && ids[0] != 'CONTAINER' && ids[0] != 'WINDOW' &&
        ids[0] != 'DOCUMENT' && ids[0] != 'BODY' && ids[0] != 'QUERYSELECTOR') {
        for (var i = 0; i < ids.length; i++)
            elems.push(getElement(ids[i], isParent));
    } else {
        elems.push(getElement(ids, isParent));
    }
    return elems;
}

function getElement(id, isParent) {
    var elem;
    if (Array.isArray(id) && id[0] == 'CONTAINER') {
        if (appInstance !== null) {
            elem = appInstance.container;
        } else if (typeof _initGlob !== 'undefined') {
            // if we are on the initialization stage, we still can have access
            // to the container element
            var id = _initGlob.container;
            if (isParent) {
                elem = parent.document.getElementById(id);
            } else {
                elem = document.getElementById(id);
            }
        }
    } else if (Array.isArray(id) && id[0] == 'WINDOW') {
        if (isParent)
            elem = parent;
        else
            elem = window;
    } else if (Array.isArray(id) && id[0] == 'DOCUMENT') {
        if (isParent)
            elem = parent.document;
        else
            elem = document;
    } else if (Array.isArray(id) && id[0] == 'BODY') {
        if (isParent)
            elem = parent.document.body;
        else
            elem = document.body;
    } else if (Array.isArray(id) && id[0] == 'QUERYSELECTOR') {
        if (isParent)
            elem = parent.document.querySelector(id);
        else
            elem = document.querySelector(id);
    } else {
        if (isParent)
            elem = parent.document.getElementById(id);
        else
            elem = document.getElementById(id);
    }
    return elem;
}



// setHTMLElemStyle puzzle
function setHTMLElemStyle(prop, value, ids, isParent) {
    var elems = getElements(ids, isParent);
    for (var i = 0; i < elems.length; i++) {
        var elem = elems[i];
        if (!elem || !elem.style)
            continue;
        elem.style[prop] = value;
    }
}



// setHTMLElemAttribute puzzle
function setHTMLElemAttribute(attr, value, ids, isParent) {
    var elems = getElements(ids, isParent);
    for (var i = 0; i < elems.length; i++) {
        var elem = elems[i];
        if (!elem)
            continue;
        elem[attr] = value;
    }
}




// initSettings puzzle
_initGlob.output.initOptions.fadeAnnotations = true;
_initGlob.output.initOptions.useBkgTransp = true;
_initGlob.output.initOptions.preserveDrawBuf = false;
_initGlob.output.initOptions.useCompAssets = false;
_initGlob.output.initOptions.useFullscreen = true;

loadFont('./fonts/Bellefair-Regular.ttf', 'bellefair');

setHTMLElemStyle('backgroundColor', '#212121', ['BODY'], true);


// initPreloader puzzle
_initGlob.output.initOptions.useCustomPreloader = true;
_initGlob.output.initOptions.preloaderStartCb = function() {
    _initGlob.percentage = 0;
    (function() {
  setHTMLElemStyle('display', 'block', 'preloader_container', true);
})();
};
_initGlob.output.initOptions.preloaderProgressCb = function(percentage) {
    _initGlob.percentage = percentage;
    (function() {
  setHTMLElemStyle('height', String(Math.round(Math.round(_initGlob.percentage) / 1)) + '%', 'preloader_color', true);
  setHTMLElemAttribute('innerHTML', String(Math.round(Math.round(_initGlob.percentage) / 1)) + '%', 'preloader_percentage', true);
})();
};
_initGlob.output.initOptions.preloaderEndCb = function() {
    _initGlob.percentage = 100;
    (function() {
  setHTMLElemStyle('display', 'none', 'preloader_screen', true);
})();
};

    return _initGlob.output;
}

PL.init = function(appInstance, initOptions) {
initOptions = initOptions || {};

if ('fadeAnnotations' in initOptions) {
    _pGlob.fadeAnnotations = initOptions.fadeAnnotations;
}

this.procedures["do_inclinaison"] = do_inclinaison;

var annot_visible, frame;


// utility functions envoked by the HTML puzzles
function getElements(ids, isParent) {
    var elems = [];
    if (Array.isArray(ids) && ids[0] != 'CONTAINER' && ids[0] != 'WINDOW' &&
        ids[0] != 'DOCUMENT' && ids[0] != 'BODY' && ids[0] != 'QUERYSELECTOR') {
        for (var i = 0; i < ids.length; i++)
            elems.push(getElement(ids[i], isParent));
    } else {
        elems.push(getElement(ids, isParent));
    }
    return elems;
}

function getElement(id, isParent) {
    var elem;
    if (Array.isArray(id) && id[0] == 'CONTAINER') {
        if (appInstance !== null) {
            elem = appInstance.container;
        } else if (typeof _initGlob !== 'undefined') {
            // if we are on the initialization stage, we still can have access
            // to the container element
            var id = _initGlob.container;
            if (isParent) {
                elem = parent.document.getElementById(id);
            } else {
                elem = document.getElementById(id);
            }
        }
    } else if (Array.isArray(id) && id[0] == 'WINDOW') {
        if (isParent)
            elem = parent;
        else
            elem = window;
    } else if (Array.isArray(id) && id[0] == 'DOCUMENT') {
        if (isParent)
            elem = parent.document;
        else
            elem = document;
    } else if (Array.isArray(id) && id[0] == 'BODY') {
        if (isParent)
            elem = parent.document.body;
        else
            elem = document.body;
    } else if (Array.isArray(id) && id[0] == 'QUERYSELECTOR') {
        if (isParent)
            elem = parent.document.querySelector(id);
        else
            elem = document.querySelector(id);
    } else {
        if (isParent)
            elem = parent.document.getElementById(id);
        else
            elem = document.getElementById(id);
    }
    return elem;
}



// setHTMLElemStyle puzzle
function setHTMLElemStyle(prop, value, ids, isParent) {
    var elems = getElements(ids, isParent);
    for (var i = 0; i < elems.length; i++) {
        var elem = elems[i];
        if (!elem || !elem.style)
            continue;
        elem.style[prop] = value;
    }
}



// eventHTMLElem puzzle
function eventHTMLElem(eventType, ids, isParent, callback) {
    var elems = getElements(ids, isParent);
    for (var i = 0; i < elems.length; i++) {
        var elem = elems[i];
        if (!elem)
            continue;
        elem.addEventListener(eventType, callback, false);
    }
}




// utility function envoked by almost all V3D-specific puzzles
// filter off some non-mesh types
function notIgnoredObj(obj) {
    return (obj.type !== "AmbientLight" && obj.name !== ""
            && !(obj.isMesh && obj.isMaterialGeneratedMesh));
}


// utility function envoked by almost all V3D-specific puzzles
// find first occurence of the object by its name
function getObjectByName(objName) {
    var objFound;
    var runTime = _pGlob !== undefined;
    objFound = runTime ? _pGlob.objCache[objName] : null;

    if (objFound && objFound.name === objName)
        return objFound;

    appInstance.scene.traverse(function(obj) {
        if (!objFound && notIgnoredObj(obj) && (obj.name == objName)) {
            objFound = obj;
            if (runTime) {
                _pGlob.objCache[objName] = objFound;
            }
        }
    });
    return objFound;
}


// utility function envoked by almost all V3D-specific puzzles
// retrieve all objects on the scene
function getAllObjectNames() {
    var objNameList = [];
    appInstance.scene.traverse(function(obj) {
        if (notIgnoredObj(obj))
            objNameList.push(obj.name)
    });
    return objNameList;
}


// utility function envoked by almost all V3D-specific puzzles
// retrieve all objects which belong to the group
function getObjectNamesByGroupName(targetGroupName) {
    var objNameList = [];
    appInstance.scene.traverse(function(obj){
        if (notIgnoredObj(obj)) {
            var groupNames = obj.groupNames;
            if (!groupNames)
                return;
            for (var i = 0; i < groupNames.length; i++) {
                var groupName = groupNames[i];
                if (groupName == targetGroupName) {
                    objNameList.push(obj.name);
                }
            }
        }
    });
    return objNameList;
}


// utility function envoked by almost all V3D-specific puzzles
// process object input, which can be either single obj or array of objects, or a group
function retrieveObjectNames(objNames) {
    var acc = [];
    retrieveObjectNamesAcc(objNames, acc);
    return acc;
}

function retrieveObjectNamesAcc(currObjNames, acc) {
    if (typeof currObjNames == "string") {
        acc.push(currObjNames);
    } else if (Array.isArray(currObjNames) && currObjNames[0] == "GROUP") {
        var newObj = getObjectNamesByGroupName(currObjNames[1]);
        for (var i = 0; i < newObj.length; i++)
            acc.push(newObj[i]);
    } else if (Array.isArray(currObjNames) && currObjNames[0] == "ALL_OBJECTS") {
        var newObj = getAllObjectNames();
        for (var i = 0; i < newObj.length; i++)
            acc.push(newObj[i]);
    } else if (Array.isArray(currObjNames)) {
        for (var i = 0; i < currObjNames.length; i++)
            retrieveObjectNamesAcc(currObjNames[i], acc);
    }
}




// isObjectVisible puzzle
function isObjectVisible(objNames) {
    objNames = retrieveObjectNames(objNames);
    if (!objNames)
        return false;
    for (var i = 0; i < objNames.length; i++) {
        var objName = objNames[i]
        if (!objName)
            continue;
        var obj = getObjectByName(objName);
        if (!obj)
            continue;
        if (obj.visible)
            return true;
    }
    return false;
}



// show and hide puzzles
function changeVis(objNames, bool) {
    objNames = retrieveObjectNames(objNames);
    if (!objNames)
        return;
    for (var i = 0; i < objNames.length; i++) {
        var objName = objNames[i]
        if (!objName)
            continue;
        var obj = getObjectByName(objName);
        if (!obj)
            continue;
        obj.visible = bool;
    }
}



// zoomCamera puzzle
function zoomCamera(objNames, duration, doSlot) {

    duration = Math.max(0, duration);

    objNames = retrieveObjectNames(objNames);
    if (!objNames) {
        return;
    }

    var zoomObjects = [];
    objNames.forEach(function(name) {
        var obj = getObjectByName(name);
        if (obj) {
            zoomObjects.push(obj);
        }
    });

    if (!zoomObjects.length) {
        return;
    }

    var pos = _pGlob.vec3Tmp, target = _pGlob.vec3Tmp2;
    v3d.CameraUtils.calcCameraZoomToObjectsParams(appInstance.camera, zoomObjects,
            pos, target);

    if (appInstance.controls && appInstance.controls.tween) {
        // orbit and flying cameras
        if (!appInstance.controls.inTween) {
            appInstance.controls.tween(pos, target, duration, doSlot);
        }
    } else {
        // TODO: static camera, just position it for now
        if (appInstance.camera.parent) {
            appInstance.camera.parent.worldToLocal(pos);
        }
        appInstance.camera.position.copy(pos);
        appInstance.camera.lookAt(target);
        doSlot();
    }
}



function matGetValues(matName) {

    var mat = v3d.SceneUtils.getMaterialByName(appInstance, matName);
    if (!mat)
        return [];

    if (mat.isMeshNodeMaterial)
        return Object.keys(mat.nodeValueMap);
    else if (mat.isMeshStandardMaterial)
        return ['metalness', 'roughness', 'bumpScale', 'emissiveIntensity', 'envMapIntensity'];
    else
        return [];
}



// setMaterialValue puzzle
function setMaterialValue(matName, valName, value) {

    var values = matGetValues(matName);
    if (values.indexOf(valName) < 0)
        return;

    var mats = v3d.SceneUtils.getMaterialsByName(appInstance, matName);

    for (var i = 0; i < mats.length; i++) {
        var mat = mats[i];

        if (mat.isMeshNodeMaterial) {
            var valIdx = mat.nodeValueMap[valName];
            mat.nodeValue[valIdx] = value;
        } else
            mat[valName] = value;

        if (mat === appInstance.worldMaterial)
            appInstance.updateEnvironment(mat);
    }
}



/**
 * Retreive standard accessible textures for MeshNodeMaterial,
 * MeshStandardMaterial or MeshPhongMaterial. If "collectSameNameMats" is true
 * then all materials in the scene with the given name will be used for collecting
 * textures, otherwise will be used only the first found material (default behavior).
 */
function matGetEditableTextures(matName, collectSameNameMats) {

    var mats = [];
    if (collectSameNameMats) {
        mats = v3d.SceneUtils.getMaterialsByName(appInstance, matName);
    } else {
        var firstMat = v3d.SceneUtils.getMaterialByName(appInstance, matName);
        if (firstMat !== null) {
            mats = [firstMat];
        }
    }

    var textures = mats.reduce(function(texArray, mat) {
        var matTextures = [];
        switch (mat.type) {
            case 'MeshNodeMaterial':
                matTextures = Object.values(mat.nodeTextures);
                break;

            case 'MeshStandardMaterial':
                matTextures = [
                    mat.map, mat.lightMap, mat.aoMap, mat.emissiveMap,
                    mat.bumpMap, mat.normalMap, mat.displacementMap,
                    mat.roughnessMap, mat.metalnessMap, mat.alphaMap, mat.envMap
                ]
                break;

            case 'MeshPhongMaterial':
                matTextures = [
                    mat.map, mat.lightMap, mat.aoMap, mat.emissiveMap,
                    mat.bumpMap, mat.normalMap, mat.displacementMap,
                    mat.specularMap, mat.alphaMap, mat.envMap
                ];
                break;
            default:
                console.error('matGetEditableTextures: Unknown material type ' + mat.type);
                break;
        }

        Array.prototype.push.apply(texArray, matTextures);
        return texArray;
    }, []);

    return textures.filter(function(elem) {
        // check Texture type exactly
        return elem && (elem.constructor == v3d.Texture || elem.constructor == v3d.DataTexture);
    });
}



// replaceTexture puzzle
function replaceTexture(matName, texName, texUrlOrElem, doCb) {

    var textures = matGetEditableTextures(matName, true).filter(function(elem) {
        return elem.name == texName;
    });

    if (!textures.length)
        return;

    if (texUrlOrElem instanceof Promise) {

        texUrlOrElem.then(function(response) {
           processImageUrl(response);
        }, function(error) {});

    } else if (typeof texUrlOrElem == 'string') {

        processImageUrl(texUrlOrElem);

    } else if (texUrlOrElem instanceof HTMLVideoElement) {

        processVideo(texUrlOrElem);

    } else if (texUrlOrElem instanceof HTMLCanvasElement) {

        processCanvas(texUrlOrElem);

    } else {

        return;

    }

    function processImageUrl(url) {

        var isHDR = (url.search(/\.hdr$/) > 0);

        if (!isHDR) {
            var loader = new v3d.ImageLoader();
            loader.setCrossOrigin('Anonymous');
        } else {
            var loader = new v3d.FileLoader();
            loader.setResponseType('arraybuffer');
        }

        loader.load(url, function(image) {
            // JPEGs can't have an alpha channel, so memory can be saved by storing them as RGB.
            var isJPEG = url.search(/\.(jpg|jpeg)$/) > 0 || url.search(/^data\:image\/jpeg/) === 0;

            textures.forEach(function(elem) {

                if (!isHDR) {
                    elem.image = image;
                } else {
                    // parse loaded HDR buffer
                    var rgbeLoader = new v3d.RGBELoader();
                    var texData = rgbeLoader.parse(image);

                    // NOTE: reset params since the texture may be converted to float
                    elem.type = v3d.UnsignedByteType;
                    elem.encoding = v3d.RGBEEncoding;

                    elem.image = {
                        data: texData.data,
                        width: texData.width,
                        height: texData.height
                    }

                    elem.magFilter = v3d.LinearFilter;
                    elem.minFilter = v3d.LinearFilter;
                    elem.generateMipmaps = false;
                    elem.isDataTexture = true;

                }

                elem.format = isJPEG ? v3d.RGBFormat : v3d.RGBAFormat;
                elem.needsUpdate = true;

                // update world material if it is using this texture
                var wMat = appInstance.worldMaterial;
                if (wMat)
                    for (var texName in wMat.nodeTextures)
                        if (wMat.nodeTextures[texName] == elem)
                            appInstance.updateEnvironment(wMat);

            });

            // exec once
            doCb();

        });
    }

    function processVideo(elem) {
        var videoTex = new v3d.VideoTexture(elem);
        videoTex.flipY = false;
        videoTex.name = texName;

        var videoAssigned = false;

        var mats = v3d.SceneUtils.getMaterialsByName(appInstance, matName);
        mats.forEach(function(mat) {

            if (mat.type != 'MeshNodeMaterial')
                return;

            for (var name in mat.nodeTextures) {

                textures.forEach(function(tex) {

                    if (mat.nodeTextures[name] == tex) {
                        mat.nodeTextures[name] = videoTex;
                    }

                });

            }

            mat.needsUpdate = true;
            videoAssigned = true;
        });

        if (videoAssigned)
            doCb();

    }

    function processCanvas(elem) {
        var canvasTex = new v3d.CanvasTexture(elem);
        canvasTex.flipY = false;
        canvasTex.name = texName;

        var canvasAssigned = false;

        var mats = v3d.SceneUtils.getMaterialsByName(appInstance, matName);
        mats.forEach(function(mat) {

            if (mat.type != 'MeshNodeMaterial')
                return;

            for (var name in mat.nodeTextures) {

                textures.forEach(function(tex) {

                    if (mat.nodeTextures[name] == tex) {
                        mat.nodeTextures[name] = canvasTex;
                    }

                });

            }

            mat.needsUpdate = true;
            canvasAssigned = true;
        });

        if (canvasAssigned) {

            v3d.PL.canvasTextures = v3d.PL.canvasTextures || {};
            v3d.PL.canvasTextures[canvasTex.image.id] = canvasTex;

            doCb();
        }

    }
}



// ssaoAdv puzzle
function ssaoAdv(radius, minDist, maxDist) {
    appInstance.enablePostprocessing([{
        type: 'ssao',
        radius: radius,
        minDistance: minDist,
        maxDistance: maxDist
    }]);
}



// dof puzzle
function dof(focus, aperture, maxblur, depthLeakThreshold) {
    appInstance.enablePostprocessing([{
        type: 'dof',
        focus: focus,
        aperture: aperture,
        maxblur: maxblur,
        depthLeakThreshold: depthLeakThreshold
    }]);
}



// bloom puzzle
function bloom(threshold, strength, radius) {
    appInstance.enablePostprocessing([{
        type: 'bloom',
        threshold: threshold,
        strength: strength,
        radius: radius
    }]);
}



// addAnnotation and removeAnnotation puzzles
function handleAnnot(add, annot, objNames, contents, id) {
    objNames = retrieveObjectNames(objNames);
    if (!objNames)
        return;
    for (var i = 0; i < objNames.length; i++) {
        var objName = objNames[i];
        if (!objName)
            continue;
        var obj = getObjectByName(objName);
        if (!obj)
            continue;
        // check if it already has an annotation and remove it
        for (var j = 0; j < obj.children.length; j++) {
            var child = obj.children[j];
            if (child.type == "Annotation") {
                obj.remove(child);
                appInstance.container.removeChild(child.annotation);
            }
        }
        if (add) {
            var aObj = new v3d.Annotation(appInstance.container, annot, contents);
            aObj.name = annot;
            aObj.fadeObscured = _pGlob.fadeAnnotations;
            if (id) {
                aObj.annotation.id = id;
                aObj.annotationDialog.id = id+'_dialog';
            }
            obj.add(aObj);
        }
    }
}



// getAnimations puzzle
function getAnimations(objNames) {
    objNames = retrieveObjectNames(objNames);
    if (!objNames)
        return;
    var animations = [];
    for (var i = 0; i < objNames.length; i++) {
        var objName = objNames[i];
        if (!objName)
            continue;
        // use objName as animName - for now we have one-to-one match
        var action = v3d.SceneUtils.getAnimationActionByName(appInstance, objName);
        if (action)
            animations.push(objName);
    }
    return animations;
}



/**
 * Get a scene that contains the root of the given action.
 */
function getSceneByAction(action) {
    var root = action.getRoot();
    var scene = root.type == "Scene" ? root : null;
    root.traverseAncestors(function(ancObj) {
        if (ancObj.type == "Scene") {
            scene = ancObj;
        }
    });
    return scene;
}



/**
 * Get the current scene's framerate.
 */
function getSceneAnimFrameRate(scene) {
    if (scene && "v3d" in scene.userData && "animFrameRate" in scene.userData.v3d) {
        return scene.userData.v3d.animFrameRate;
    }
    return 24;
}



var initAnimationMixer = function() {

    function onMixerFinished(e) {
        var cb = _pGlob.animMixerCallbacks;
        var found = [];
        for (var i = 0; i < cb.length; i++) {
            if (cb[i][0] == e.action) {
                cb[i][0] = null; // desactivate
                found.push(cb[i][1]);
            }
        }
        for (var i = 0; i < found.length; i++) {
            found[i]();
        }
    }

    return function initAnimationMixer() {
        if (appInstance.mixer && !appInstance.mixer.hasEventListener('finished', onMixerFinished))
            appInstance.mixer.addEventListener('finished', onMixerFinished);
    };

}();



// animation puzzles
function operateAnimation(operation, animations, from, to, loop, speed, callback, isPlayAnimCompat, rev) {
    if (!animations)
        return;
    // input can be either single obj or array of objects
    if (typeof animations == "string")
        animations = [animations];

    function processAnimation(animName) {
        var action = v3d.SceneUtils.getAnimationActionByName(appInstance, animName);
        if (!action)
            return;
        switch (operation) {
        case 'PLAY':
            if (!action.isRunning()) {
                action.reset();
                if (loop && (loop != "AUTO"))
                    action.loop = v3d[loop];
                var scene = getSceneByAction(action);
                var frameRate = getSceneAnimFrameRate(scene);

                // compatibility reasons: deprecated playAnimation puzzles don't
                // change repetitions
                if (!isPlayAnimCompat) {
                    action.repetitions = Infinity;
                }

                var timeScale = Math.abs(parseFloat(speed));
                if (rev)
                    timeScale *= -1;

                action.timeScale = timeScale;
                action.timeStart = from !== null ? from/frameRate : 0;
                if (to !== null) {
                    action.getClip().duration = to/frameRate;
                } else {
                    action.getClip().resetDuration();
                }
                action.time = timeScale >= 0 ? action.timeStart : action.getClip().duration;

                action.paused = false;
                action.play();

                // push unique callbacks only
                var callbacks = _pGlob.animMixerCallbacks;
                var found = false;

                for (var j = 0; j < callbacks.length; j++)
                    if (callbacks[j][0] == action && callbacks[j][1] == callback)
                        found = true;

                if (!found)
                    _pGlob.animMixerCallbacks.push([action, callback]);
            }
            break;
        case 'STOP':
            action.stop();

            // remove callbacks
            var callbacks = _pGlob.animMixerCallbacks;
            for (var j = 0; j < callbacks.length; j++)
                if (callbacks[j][0] == action) {
                    callbacks.splice(j, 1);
                    j--
                }

            break;
        case 'PAUSE':
            action.paused = true;
            break;
        case 'RESUME':
            action.paused = false;
            break;
        case 'SET_FRAME':
            var scene = getSceneByAction(action);
            var frameRate = getSceneAnimFrameRate(scene);
            action.time = from ? from/frameRate : 0;
            action.play();
            action.paused = true;
            break;
        }
    }

    for (var i = 0; i < animations.length; i++) {
        var animName = animations[i];
        if (animName)
            processAnimation(animName);
    }

    initAnimationMixer();
}


// Describe this function...
function do_inclinaison(frame) {

  operateAnimation('SET_FRAME', getAnimations('T70x10L201.002'), frame, null, 'AUTO', 1,
          function() {}, undefined, false);


  operateAnimation('SET_FRAME', getAnimations('T70x10L201.001'), frame, null, 'AUTO', 1,
          function() {}, undefined, false);


  operateAnimation('SET_FRAME', getAnimations('T70x10L201.003'), frame, null, 'AUTO', 1,
          function() {}, undefined, false);


  operateAnimation('SET_FRAME', getAnimations('Spot.1'), frame, null, 'AUTO', 1,
          function() {}, undefined, false);


  operateAnimation('SET_FRAME', getAnimations('Spot.2'), frame, null, 'AUTO', 1,
          function() {}, undefined, false);


  operateAnimation('SET_FRAME', getAnimations('Spot.3'), frame, null, 'AUTO', 1,
          function() {}, undefined, false);

      }


eventHTMLElem('click', 'hide_annot', true, function(event) {
  setHTMLElemStyle('display', 'none', ['poi_2', 'poi_1', 'poi_4', 'poi_3'], false);
  annot_visible = false;
});
eventHTMLElem('click', 'show_annot', true, function(event) {
  setHTMLElemStyle('display', 'block', 'poi_1', false);
  if (isObjectVisible('lampe1')) {
    setHTMLElemStyle('display', 'block', 'poi_2', false);
  }
  if (isObjectVisible('lampe2')) {
    setHTMLElemStyle('display', 'block', 'poi_3', false);
  }
  if (isObjectVisible('lampe3')) {
    setHTMLElemStyle('display', 'block', 'poi_4', false);
  }
  annot_visible = true;
});

annot_visible = true;

eventHTMLElem('click', 'button_route_on', true, function(event) {
  changeVis(['GROUP', 'route'], true);
});
eventHTMLElem('click', 'button_route_off', true, function(event) {
  changeVis(['GROUP', 'route'], false);
});

zoomCamera(['GROUP', 'lamp3'], 1, function() {});

changeVis(['GROUP', 'lamp1'], false);
changeVis(['GROUP', 'lamp2'], false);
changeVis(['GROUP', 'spots'], false);

setMaterialValue('Verre Transparen.001', 'emissiveIntensity', 0);

eventHTMLElem('click', 'button_nb_lamp_1', true, function(event) {
  zoomCamera(['GROUP', 'lamp1'], 3, function() {});
  changeVis(['GROUP', 'lamp2'], false);
  changeVis(['GROUP', 'lamp3'], false);
  changeVis(['GROUP', 'lamp1'], true);
  if (isObjectVisible(['GROUP', 'spots'])) {
    changeVis('Spot.1', true);
    changeVis('Spot.2', false);
    changeVis('Spot.3', false);
  }
  setHTMLElemStyle('display', 'none', ['poi_4', 'poi_3'], false);
  if (annot_visible == true) {
    setHTMLElemStyle('display', 'block', 'poi_2', false);
  }
});
eventHTMLElem('click', 'button_nb_lamp_2', true, function(event) {
  zoomCamera(['GROUP', 'lamp2'], 3, function() {});
  changeVis(['GROUP', 'lamp2'], true);
  changeVis(['GROUP', 'lamp3'], false);
  changeVis(['GROUP', 'lamp1'], false);
  if (isObjectVisible(['GROUP', 'spots'])) {
    changeVis('Spot.2', true);
    changeVis('Spot.1', false);
    changeVis('Spot.3', false);
  }
  setHTMLElemStyle('display', 'none', ['poi_2', 'poi_4'], false);
  if (annot_visible == true) {
    setHTMLElemStyle('display', 'block', 'poi_3', false);
  }
});
eventHTMLElem('click', 'button_nb_lamp_3', true, function(event) {
  zoomCamera(['GROUP', 'lamp3'], 3, function() {});
  changeVis(['GROUP', 'lamp3'], true);
  changeVis(['GROUP', 'lamp2'], false);
  changeVis(['GROUP', 'lamp1'], false);
  if (isObjectVisible(['GROUP', 'spots'])) {
    changeVis('Spot.3', true);
    changeVis('Spot.2', false);
    changeVis('Spot.1', false);
  }
  setHTMLElemStyle('display', 'none', ['poi_2', 'poi_3'], false);
  if (annot_visible == true) {
    setHTMLElemStyle('display', 'block', 'poi_4', false);
  }
});
eventHTMLElem('click', 'button_curve_0', true, function(event) {
  do_inclinaison(30);
});
eventHTMLElem('click', 'button_curve_1', true, function(event) {
  do_inclinaison(15);
});
eventHTMLElem('click', 'button_curve_2', true, function(event) {
  do_inclinaison(0);
});

eventHTMLElem('click', 'button_material_1', true, function(event) {
  replaceTexture('peinture brillan', 'chrome_BaseColor.png', './noir_basecolor.png', function() {});
  replaceTexture('peinture brillan', 'chrome_Normal.png', './noir_Normal.png', function() {});
  replaceTexture('peinture brillan', 'chrome_OcclusionRoughnessMetallic.png', 'noir_OcclusionRoughnessMetallic.png', function() {});
});
eventHTMLElem('click', 'button_material_2', true, function(event) {
  replaceTexture('peinture brillan', 'chrome_BaseColor.png', 'steel_BaseColor.png', function() {});
  replaceTexture('peinture brillan', 'chrome_Normal.png', 'steel_Normal.png', function() {});
  replaceTexture('peinture brillan', 'chrome_OcclusionRoughnessMetallic.png', 'steel_OcclusionRoughnessMetallic.png', function() {});
});
eventHTMLElem('click', 'button_material_3', true, function(event) {
  replaceTexture('peinture brillan', 'chrome_BaseColor.png', 'rouge_BaseColor.png', function() {});
  replaceTexture('peinture brillan', 'chrome_Normal.png', 'rouge_Normal.png', function() {});
  replaceTexture('peinture brillan', 'chrome_OcclusionRoughnessMetallic.png', 'rouge_OcclusionRoughnessMetallic.png', function() {});
});

ssaoAdv(0.1, 0.005, 0.1);
dof(10, 1, 0.001, 0.2);
bloom(1.6, 0.3, 0.5);

eventHTMLElem('click', 'button_jour', true, function(event) {
  changeVis(['GROUP', 'spots'], false);
  changeVis(['GROUP', 'sun'], true);
  bloom(1.6, 0.3, 0.5);
  setMaterialValue('Verre Transparen.001', 'emissiveIntensity', 0);
});
eventHTMLElem('click', 'button_nuit', true, function(event) {
  changeVis(['GROUP', 'sun'], false);
  changeVis(['GROUP', 'spots'], true);
  if (isObjectVisible(['GROUP', 'lamp2'])) {
    changeVis('Spot.2', true);
    changeVis('Spot.1', false);
    changeVis('Spot.3', false);
  } else {
    changeVis('Spot.2', false);
  }
  if (isObjectVisible(['GROUP', 'lamp1'])) {
    changeVis('Spot.1', true);
    changeVis('Spot.2', false);
    changeVis('Spot.3', false);
  } else {
    changeVis('Spot.1', false);
  }
  if (isObjectVisible(['GROUP', 'lamp3'])) {
    changeVis('Spot.3', true);
    changeVis('Spot.1', false);
    changeVis('Spot.2', false);
  } else {
    changeVis('Spot.3', false);
  }
  bloom(0.4, 0.3, 0.5);
  setMaterialValue('Verre Transparen.001', 'emissiveIntensity', 10);
});

handleAnnot(true, '1', 'voltage', 'Mat extrêmement resistant', 'poi_1');
handleAnnot(true, '2', 'lampe1', 'Lumière très puissante', 'poi_2');
handleAnnot(true, '2', 'lampe2', 'Lumière très puissante', 'poi_3');
handleAnnot(true, '2', 'lampe3', 'Lumière très puissante', 'poi_4');

setHTMLElemStyle('display', 'none', ['poi_2', 'poi_3'], false);



} // end of PL.init function

})(); // end of closure

/* ================================ end of code ============================= */
