namespace jak_daleko_vozilla_webapp.Model
{
    public class Location
    {
        public Location(double latitude, double longitude)
        {
            Latitude = latitude;
            Longitude = longitude;
        }

        public double Latitude { get;  }
        public double Longitude { get;  }     
        
        public bool IsInBoundingBox(Location topLeft, Location bottomRight)
        {
            return Latitude <= topLeft.Latitude &&
                Longitude >= topLeft.Longitude &&
                Latitude >= bottomRight.Latitude &&
                Longitude <= bottomRight.Longitude;
        }
    }
}
