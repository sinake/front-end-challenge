//declaring the dom object.
function domobj(){
  var self        = this;
  self.products   = [];
  self.template   = null;

  //getting the response data from data.json creating new productobj and pushing them to self.products array. Then running gettemplate
  self.getproducts = function(url){
    $.getJSON(url, function(response){
      for(var i = 0; i < response.sales.length; i++){
        self.products.push( new productobj(response.sales[i], i)  );
      }
      self.gettemplate(); 
    }) 
  }
  
  //getting the product template then running updateproducthtml
  self.gettemplate = function(){
    $.get("product-template.html", function(template){
      self.template = template;
      self.updateproducthtml();
    })
  }  

  //getting the updated html for each product then running updatedom  
  self.updateproducthtml = function(){
      for(var i = 0; i < self.products.length ; i++){
        self.products[i].updatehtml(self.template);
      }
      self.updatedom();
  }
  
  //updating the dom by filling it with the products html
  self.updatedom = function(){
    thishtml = "";
    for(var i=0; i< self.products.length ; i++){
      if (i % 3 == 0 ){  thishtml += "<div class='row'>";}
      thishtml += self.products[i].htmlview;
      if ((i % 3 == 2) || i == (self.products.length-1) ){thishtml += "</div>";}
    }
    $("#content").append(thishtml);

    //delete a product when the x is clicked
    $(".close-button").click(function(){
      $(this).parent().hide("slow");
    })
  }
  
}

//defining product objects attributes
function productobj(product, i){
  var self                  = this;
  self.photo                = product.photos.medium_half;
  self.title                = product.name;
  self.tagline              = product.tagline;
  self.url                  = product.url;
  self.htmlview             = "";
  self.index                = i;
  self.custom_class         = "col"+ ((i % 3) +1);
  self.product_description  = product.description;
  
  //filling product-template with product object attributes
  self.updatehtml = function(template){
    self.htmlview = template.replace('{image}', self.photo).replace('{title}', self.title).replace('{tagline}', self.tagline).replace('{url}', self.url).replace('{custom_class}', self.custom_class).replace('{product_description}', self.product_description);
  }
  
}

//creating new dom object, running getproducts.
var page = new domobj();
page.getproducts('data.json')

