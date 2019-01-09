namespace jak_daleko_vozilla_webapp.Model
{
    public class Vehicle
    {
        public string PlatesNumber { get; set; }
        public string SideNumber { get; set; }
        public Location Location { get; set; }
        public double Distance { get; set; }
        public VehicleStatus Status { get; set; }
    }
}
