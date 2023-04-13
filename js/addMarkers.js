AFRAME.registerComponent("create-markers", {
  init:async function(){
    var mainScene = document.querySelector("#main-scene")
    var dishes = await this.getDishes()
    dishes.map(dish => {
      console.log(dish.id)
      var marker = document.createElement("a-marker")
      marker.setAttribute("id", dish.id);
      marker.setAttribute("type","pattern");
      marker.setAttribute("url",dish.marker_pattern_url);
      marker.setAttribute("cursor",{rayOrigin:"mouse"});
      marker.setAttribute("markerhandler",{})
      mainScene.appendChild(marker)
      var model = document.createElement("a-entity")
      model.setAttribute("id",`model-${dish.id}`)
      model.setAttribute("position",dish.marker_model_geometry.position)
      model.setAttribute("rotation",dish.marker_model_geometry.rotation)
      model.setAttribute("scale",dish.marker_model_geometry.scale)
      model.setAttribute("gltf-model",`url(${dish.model_url})`)
      model.setAttribute("gesture-handler",{})
      marker.appendChild(model)
      var mainPlane = document.createElement("a-plane");
      mainPlane.setAttribute(`id`,`mainPlane${dish.id}`);
      mainPlane.setAttribute("position",{x:0, y:0, z:0});
      mainPlane.setAttribute("rotation",{x:-90,y:0,z:0});
      mainPlane.setAttribute("width",1.7);
      mainPlane.setAttribute("height",1.5);
      marker.appendChild(mainPlane);
      var titlePlane = document.createElement("a-plane");
      titlePlane.setAttribute(`id`,`titlePlane${dish.id}`);
      titlePlane.setAttribute("position",{x:0, y:0.89, z:0.02});
      titlePlane.setAttribute("rotation",{x:0,y:0,z:0});
      titlePlane.setAttribute("width",1.7);
      titlePlane.setAttribute("height",0.3);
      titlePlane.setAttribute("material",{color:"#F0C30F"});      
      mainPlane.appendChild(titlePlane)
      var dishTitle = document.createElement("a-entity");
      dishTitle.setAttribute("id",`dishTitle${dish.id}`);
      dishTitle.setAttribute("position",{x:0,y:0,z:0.1});
      dishTitle.setAttribute("rotation",{x:0,y:0,z:0.1});
      dishTitle.setAttribute("text",{ font: "monoid", color: "black", width: 1.8, height: 1, align: "center", 
      value: dish.dish_name.toUpperCase()});
      titlePlane.appendChild(dishTitle);
      var ingrediants = document.createElement("a-entity");
      ingrediants.setAttribute("id",`ingrediants${dish.id}`);
      ingrediants.setAttribute("position",{x:0,y:0,z:0.1});
      ingrediants.setAttribute("rotation",{x:0,y:0,z:0});
      ingrediants.setAttribute("text",{ font: "monoid", color: "black", width: 1.8, align: "left", 
      value: `${dish.ingrediants.join("\n\n")}`});
      mainPlane.appendChild(ingrediants);
  }),
},

  getDishes:async function(){
    return await firebase
    .firestore()
    .collection("dishes")
    .get()
    .then(snap =>{
      return snap.docs.map(doc => doc.data())
    })
  }
})