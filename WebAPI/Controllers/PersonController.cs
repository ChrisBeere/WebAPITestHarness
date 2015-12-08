using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using WebAPI.Models;

namespace WebAPI.Controllers
{
    public class PersonController : ApiController
    {
        List<Person> people = new List<Person>();

        // GET api/values
        public IEnumerable<Person> GetPeople()
        {
            

            people.Add(new Person(1, "Chris"));
            people.Add(new Person(2, "Andy"));
            people.Add(new Person(3, "Luke"));
            people.Add(new Person(4, "Tai"));
            people.Add(new Person(5, "Andrea"));

            return people;
        }
    }
}
