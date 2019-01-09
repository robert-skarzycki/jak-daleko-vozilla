using System.Collections.Generic;
using System.Threading.Tasks;
using jak_daleko_vozilla_webapp.Logic;
using jak_daleko_vozilla_webapp.Model;
using Microsoft.AspNetCore.Mvc;

namespace jak_daleko_vozilla_webapp.Controllers
{
    [Route("api/[controller]")]
    public class VehiclesController : Controller
    {
        private readonly VehiclesFinder _vehiclesFinder = new VehiclesFinder();


        [HttpGet("[action]")]
        public Task<IEnumerable<Vehicle>> NearestVehicles()
        {
            return _vehiclesFinder.FindNearestVehicles();
        }        
    }
}
