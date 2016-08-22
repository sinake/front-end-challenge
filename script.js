//declaring the dom object.
function domobj(){
  var self        = this;
  self.products   = [];

  //getting the products response data from data.json and pushing them to products array.
  self.getproducts = function(url, callback){
    $.getJSON(url, function(response){
        for(var i=0; i<response.sales.length ; i++){
          self.products.push( new productobj(response.sales[i], i)  );
        }
        callback();
    });
  }
  
  //getting the updated html for each product  
  self.updateproducthtml = function(callback){
    for(var i = 0; i < self.products.length ; i++){
      self.products[i].updatehtml();
    }
    callback();
  }
  
  //updating the dom by filling it with the products html
  self.updatedom = function(){
    thishtml = "";
    for(var i=0; i< self.products.length ; i++){
      if (i % 3 == 0 ){  thishtml += "<div class='row'>";}
      thishtml += self.products[i].htmlview;
      if ((i % 3 == 2) || i == (self.products.length-1) ){thishtml += "</div>";}
    }

    $("#content").append(thishtml)

    //delete a product when the x is clicked
    $('.close-button').click(function(){
      $(this).parent().hide('slow');
    })
  }
  
}

//defining product objects attributes
function productobj(product, i){
  var self                  = this;
  self.photo                = product.photos.medium_half
  self.title                = product.name
  self.tagline              = product.tagline
  self.url                  = product.url
  self.htmlview             = ''
  self.index                = i
  self.custom_class         = "col"+ ((i % 3) +1)
  self.product_description  = product.description
  
  //filling product-template with product object attributes
  self.updatehtml = function(template){
    $.get('product-template.html', function(template){
        self.htmlview = template.replace('{image}', self.photo).replace('{title}', self.title).replace('{tagline}', self.tagline).replace('{url}', self.url).replace('{custom_class}', self.custom_class).replace('{product_description}', self.product_description);
      })
  }
  
}

//creating new dom object, running getproducts, then calling back updateproducthtml, then running updatedom after a short delay.
var page = new domobj();
page.getproducts('data.json', function(){
  page.updateproducthtml(function(){
    setTimeout("page.updatedom();",50);
  });
})