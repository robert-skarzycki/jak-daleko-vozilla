using jak_daleko_vozilla_webapp.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace jak_daleko_vozilla_webapp.Logic
{
    public class VehiclesFinder
    {
        private readonly VehiclesProvider _vehiclesProvider = new VehiclesProvider();
        private readonly DistanceCalculator _distanceCalculator = new DistanceCalculator();

        public async Task<IEnumerable<Vehicle>> FindNearestVehicles()
        {
            var allVehicles = await _vehiclesProvider.GetVehicles();
            var homeLocation = new Location(0,1);
            var home = new Home(homeLocation,
                new Location(0,1), new Location(0,1));

            var nearestVehicles = home.FilterVehiclesToBoundingBox(allVehicles).ToList();
            nearestVehicles.ForEach(v => v.Distance = _distanceCalculator.GetDistance(homeLocation, v.Location));

            return nearestVehicles.OrderBy(v => v.Distance);
            
        }
    }
}
