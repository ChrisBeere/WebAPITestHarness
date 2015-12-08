$('#PeopleButtonBackbone').click(function () {

        Person = Backbone.Model.extend
        ({
            // Default attributes for the Person item. 
            defaults: function () {
                return {
                    Id: -1,
                    Name: null
                };
            }
        });

        PersonSet = Backbone.Collection.extend
        ({
            model: Person,
            url: 'api/Person'
        });
             
        // Setup People View
        PeopleView = Backbone.View.extend({
            template: _.template($('#PeopleTemplate').html()),

            initialize: function () {
                this.listenTo(this.model, 'change', this.render);
                this.listenTo(this.model, 'destroy', this.remove);
            },

            render: function () {
                this.$el.html(this.template(this.model.toJSON()));
                return this;
            }
        });

        // Setup App View
        AppView = Backbone.View.extend({

            // Instead of generating a new element, bind to the existing skeleton of
            // the App already present in the HTML.
            el: $("#PeopleContainer"),

            initialize: function () {
                this.listenTo(this.model, 'change', this.render);
                this.listenTo(this.model, 'add', this.render);
            },

            render: function () {
                $("#PeopleList").html("");
                if (this.model.length) {
                    for (var i = 0; i < this.model.length; i++) {
                        var view = new PeopleView({ model: this.model.at(i) });
                        $("#PeopleList").append(view.render().el);
                    }
                }
            }
        });

        // Render the list of people
        peopleList = new PersonSet();
        peopleList.fetch({ data: { page: 'no' } });
        var app = new AppView({ model: peopleList });
        app.render();
});

$('#PeopleButton').click(function () {
    // Send an AJAX request to the WebAPI controller
    $.getJSON('api/Person').done(
        function (data) {
            $('#PeopleList').html("");
            // IEnumerable<Person> returned from Person.GetPeople
            $.each(data, function (key, item) {
                // Add a list item for the person.
                $('<li>', { text: item.Name }).appendTo($('#PeopleList'));
            });
        }).fail(function () { alert('GetJSON call failed :{') });
});