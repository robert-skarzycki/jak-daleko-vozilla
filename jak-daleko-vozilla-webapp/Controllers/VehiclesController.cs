using System.Collections.Generic;
using jak_daleko_vozilla_webapp.Model;
using Microsoft.AspNetCore.Mvc;

namespace jak_daleko_vozilla_webapp.Controllers
{
    [Route("api/[controller]")]
    public class VehiclesController : Controller
    {

        [HttpGet("[action]")]
        public IEnumerable<Vehicle> NearestVehicles()
        {
            return new[] {new Vehicle{
                PlatesNumber= "DW12345",
                Distance = 1234.2,
                SideNumber = "1234"
            } };
        }        
    }
}
