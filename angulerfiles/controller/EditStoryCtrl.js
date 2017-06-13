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
		
	EditStory.goToSlide=function(slide)
		{
				$scope.selectedSlide=slide;
				$scope.slideURL=slide.attributes.url;
				$scope.Editstory.slideDescription=slide.attributes.description;
		}
	
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
				$scope.slideURL="";
				$scope.Editstory.slideDescription="";
				SlidesQuery.count({
				success: function(count){
					
					  }
				});
				SlidesQuery.find({
					success:function(slidesFetched){
						//console.log(slidesFetched);
						$timeout(function(){
									$scope.slidesFetched=slidesFetched;
								var firstSlide=500;
									$scope.storyTouched=true;
									$scope.Editstory.storyName=Story.get("name");
									$scope.Editstory.storyMoral=Story.get("Moral");
									$scope.Editstory.storyTags="";
									$scope.Editstory.storyTags=Story.get("tag").join(" , ");
								},200);
						
					},
					error:function(){
						console.log("Error to load story");
					}
				});
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
					
					var relation=$scope.StorySelected.relation("slide");
					$scope.selectedSlide.save(
						{
							description:$scope.Editstory.slideDescription
						},
						{success:function(slide)
						{
							relation.add(slide);
							$scope.StorySelected.save(null,{
								success:function(){

									console.log("hey");
								}

							});
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
										$scope.selectedSlide.save({
											url:URL
										},{
											success:function(){alert("Successfully uploaded image");console.log("successfuly added url");},
											error:function(){console.log("Failed slide");}
										});
								  },
								function(error){console.log("failed to upload image");}
							 );	 
					}
		}
		
		EditStory.addWord=function()
		{
			var Words = Parse.Object.extend("Words");
			var word=new Words;
			var Wrelation = $scope.StorySelected.relation("word");
			word.save({
				word:EditStory.Word,
				meaning:EditStory.meaning
			  },{
				success:function(word){
					Wrelation.add(word);
					$scope.StorySelected.save(null,{
						success:function(){
							console.log("story saved");

						}

					});
					$timeout(function(){
						$("#wordModal").modal("hide");
						$scope.Editstory.slideDescription=$scope.Editstory.slideDescription.replace(EditStory.Word," #_ "+EditStory.Word+" _# ");
										},20);
					EditStory.SAVESLIDE();
					 alert('Word Saved: ' + word.get("meaning"));
					 
					Console.log("Word Saved");
					},
				error:function(error){
					$("#wordModal").modal("hide");
					// alert('Word not saved  ' + error.message);
					console.log("Failed to save word");
					}
			});
			
		}
		
		EditStory.highLightWord=function(){
			var wordToHighLight = document.getElementById('wordS').value;
			wordToHighLight = wordToHighLight.trim();
			//checking for word entry in the Words Table
			var Words = Parse.Object.extend("Words");
				WordQuery=new Parse.Query(Words);
				WordQuery.equalTo("word",wordToHighLight);
				WordQuery.count({
				success: function(count){
					if(count>0){
								if(!wordToHighLight.match("#_") || !wordToHighLight.match("_#")){
									$timeout(function(){
										$scope.Editstory.slideDescription=$scope.Editstory.slideDescription.replace(wordToHighLight," #_ "+wordToHighLight+" _# ");
										},20);
										EditStory.SAVESLIDE();
									}else $scope.Editstory.slideDescriptionMessage="You Did Something Wrong";
								console.log("word found");
								$scope.Editstory.wordFound=true;
							}else 
							{
								$scope.Editstory.wordFound=false;
								$timeout(function(){
										EditStory.Word=wordToHighLight;
										},200);
								
								$("#wordModal").modal("show");
								Editstory.meaning="";
								//console.log("word not found",EditStory.Word);
							}
					  }
				});
				
				
				
				
				
		};
		
    /*--------------------------------A P I  C A L L S----------------------------------------------*/


    /*--------------------------------R E D I R E C T I O N S----------------------------------------------*/

  })
  
