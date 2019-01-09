using jak_daleko_vozilla_webapp.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace jak_daleko_vozilla_webapp.Logic
{
    public class DistanceCalculator
    {
        public double GetDistance(Location from, Location to)
        {
            return new Random().NextDouble() * 2000;
        }
    }
}
