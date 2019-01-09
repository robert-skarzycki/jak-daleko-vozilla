using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace jak_daleko_vozilla_webapp.Model
{
    public class Home
    {
        private readonly Location _homeLocation;
        private readonly Location _topLeft;
        private readonly Location _bottomRight;

        public Home(Location homeLocation, Location topLeft, Location bottomRight)
        {
            this._homeLocation = homeLocation;
            this._topLeft = topLeft;
            this._bottomRight = bottomRight;
        }

        public IEnumerable<Vehicle> FilterVehiclesToBoundingBox(IEnumerable<Vehicle> allVehicles)
        {
            return allVehicles.Where(v => v.Location.IsInBoundingBox(_topLeft, _bottomRight));
        }
    }
}
