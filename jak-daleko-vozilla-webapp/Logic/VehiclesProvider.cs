using jak_daleko_vozilla_webapp.Model;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Threading.Tasks;

namespace jak_daleko_vozilla_webapp.Logic
{
    public class VehiclesProvider
    {
        public static string VozillaApiUrl = "https://api-client-portal.vozilla.pl/map?objectType=VEHICLE";

        public async Task<IEnumerable<Vehicle>> GetVehicles()
        {
            using(var httpClient = new HttpClient())
            {
                var result = await httpClient.GetStringAsync(VozillaApiUrl);
                var response = JsonConvert.DeserializeObject<VozillaResponse>(result);

                return response.Objects.Select(o => o.ToVehicle());
            }
        }
    }

    public class VozillaResponse
    {
        public VozillaObject[] Objects { get; set; }
    }

    public class VozillaObject
    {
        public string PlatesNumber { get; set; }
        public string SideNumber { get; set; }
        public int RangeKm { get; set; }
        public string Name { get; set; }
        public string Status { get; set; }
        public VozillaObjectLocation Location { get; set; }

        public Vehicle ToVehicle()
        {
            return new Vehicle
            {
                Location = new Location(Location.Latitude,Location.Longitude),
                PlatesNumber = PlatesNumber,
                SideNumber = SideNumber,
                Status = GetVehicleStatus()
            };
        }

        private VehicleStatus GetVehicleStatus()
        {
            if(string.Equals(Status, "AVAILABLE", StringComparison.InvariantCultureIgnoreCase))
            {
                return VehicleStatus.Available;
            }
            else if(string.Equals(Status, "RESERVED", StringComparison.InvariantCultureIgnoreCase))
            {
                return VehicleStatus.Reserved;
            }
            else
            {
                return VehicleStatus.None;
            }
        }
    }

    public class VozillaObjectLocation
    {
        public double Latitude { get; set; }
        public double Longitude { get; set; }
    }
}
