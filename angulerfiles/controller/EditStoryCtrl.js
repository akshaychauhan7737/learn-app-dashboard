var app=angular.module('bitsaa');
app.run(function (AppConfig) {
    	Parse.initialize(AppConfig.parse.appId);
		Parse.serverURL=AppConfig.parse.server;
  });
  
app.controller('EditSoCtrl', function (AppConfig,$timeout,$rootScope,$scope,$state) {
   
	/*--------------------------------D E C L A R A T I O N S----------------------------------------------*/
	var  EditStory = this;
	var offset = 0;
	var noStories=0;
	$scope.storyTouched=false;
	
			var Storys=Parse.Object.extend("Story");
			var query=new Parse.Query(Storys);
				query.count({
				success: function(count){
					var countArray=[];
					$timeout(function(){
							noStories=Math.round(count/9); 
							for(var i=0;i<noStories;i++){countArray.push(i);}
							$scope.noStories=countArray;
						},200);
					  }
				});
							
				query.skip(offset*9);
				query.limit(9);
			    query.find({
					success: function(list) {
						$timeout(function(){
							$scope.stor=list;
							$rootScope.login=true;
							},200);
					}
				});
	/*--------------------------------F U N C T I O N S----------------------------------------------*/
		EditStory.pagination=function(page)
		{
				offset=page;
				query.skip(page*9);
				query.limit(9);
			    query.find({
					success: function(list) {
						$timeout(function(){
							$scope.stor=list;
							//console.log($scope.stor);
							$rootScope.login=true;
							},200);
					}
				});
		}
		
		EditStory.SelectStory=function(Story)
		{
			var Slides=Parse.Object.extend("Slides");
			var SlidesQuery=new Parse.Query(Slides);
				$scope.StorySelected=Story;
				SlidesQuery.equalTo("storyID",Story);
				SlidesQuery.count({
				success: function(count){
					var countArray=[];
					$timeout(function(){
							Slidecount=count; 
							for(var i=0;i<Slidecount;i++){countArray.push(i);}
							$scope.Slidecount=countArray;
						},200);
					  }
				});
				SlidesQuery.find({
					success:function(slidesFetched){
						
						$timeout(function(){
								$scope.storyTouched=true;
								$scope.slidesFetched=slidesFetched;
								$scope.Editstory.storyName=Story.get("name");
								$scope.Editstory.storyMoral=Story.get("Moral");
								$scope.Editstory.storyTags="";
								EditStory.goToSlide(0);
								$scope.Editstory.storyTags=Story.get("tag").join(" , ");
								},200);
						
					},
					error:function(){
						console.log("Error to load story");
					}
				});
		}
		EditStory.goToSlide=function(index)
		{
				$scope.slideselectedIndex=index;
				$scope.slideURL=$scope.slidesFetched[index].attributes.url;
				$scope.Editstory.slideDescription=$scope.slidesFetched[index].attributes.description;
		}
		
		EditStory.SAVE= function()
				{
					console.log("Hi");
					
					$scope.StorySelected.save(
						{name:$scope.Editstory.storyName,
						 Moral:$scope.Editstory.storyMoral,
						 tag:$scope.Editstory.storyTags.split(',')
						},
						{success:function()
						{
							console.log("story saved");
						
						},
						error:function()
						{
							console.log("failed to save");
						}
						
					});
					
				}
				EditStory.SAVESLIDE= function()
				{
					console.log("Hi");
					
					$scope.slidesFetched[$scope.slideselectedIndex].save(
						{
							description:$scope.Editstory.slideDescription
						},
						{success:function()
						{
							console.log("slides saved");
						
						},
						error:function()
						{
							console.log("failed to save slides");
						}
						
					});
					
				}
		
		EditStory.editImage = function()
		{
				var Slides=Parse.Object.extend("Slides");
				var slide=new Parse.Query(Slides);
				
				//console.log("starting to upload image");
				var fileUploadControl = $("#profilePhotoFileUpload")[0];
					if (fileUploadControl.files.length > 0) {
						 var file = fileUploadControl.files[0];
						 var name = "Slide Image.jpg";
						 var parseFile = new Parse.File(name, file);
							//console.log("uploading image call to save");
							 parseFile.save().then(
								function(parseFile){
									//console.log("success to upload");
									var URL = parseFile.url();
											 // console.log(URL);
											 // console.log("getting the slide and edit the url and save it",$scope.slideselectedID);
											  slide.get($scope.slidesFetched[$scope.slideselectedIndex].id,{
												success:function(CurrSlide){
													CurrSlide.save({url:URL},{
															success:function(){
																	console.log("success");
																	$timeout(EditStory.goToSlide($scope.slideselectedIndex),200);
																}
														});
												},
												error:function(){}
											  });
								  },
								function(error){console.log("failed to upload image");}
							 );	 
					}
					
			
				
				
				/*var ImageTable=Parse.Object.extend("Images");
				var ImageQuery=new Parse.Query(ImageTable);
					ImageQuery.equalTo("url",$scope.slideURL)
					ImageQuery.find({
						success:function(myObject){
								myObject.destroy();
							}
						});
			var objImageTable=new ImageTable(ImageTable);
			
			var fileUploadControl = $("#profilePhotoFileUpload")[0];
			if (fileUploadControl.files.length > 0) {
			  var file = fileUploadControl.files[0];
			  var name = "Slide Image.jpg";

			  var parseFile = new Parse.File(name, file);
			     parseFile.save().then(
					function(parseFile) {
						
					   var URL = parseFile.url();
							console.log(URL);
							
							$scope.slidesFetched.save({
								image:objImageTable
								},{
								error:function(){console.log("error while adding image object");}
							});
							
							objImageTable.save({url:URL},{
								success:function(imgTable){$scope.slidesFetched.save();},
								error:function(){console.log("error");},
							});
						
					  }, 
					  function(error) {
						// The file either could not be read, or could not be saved to Parse.
						alert("Error: " + error.code + " " + error.message);
					  });
			}
			else $scope.EditImageMessage="Somthing is wrong with the file";
			*/
		}
		
    /*--------------------------------A P I  C A L L S----------------------------------------------*/


    /*--------------------------------R E D I R E C T I O N S----------------------------------------------*/

  })
  
