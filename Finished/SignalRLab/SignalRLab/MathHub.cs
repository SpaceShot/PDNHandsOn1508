using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Web;
using Microsoft.AspNet.SignalR;

namespace SignalRLab
{
    public class MathHub : Hub
    {
        public void Hello()
        {
            Clients.All.hello();
        }

        public void Solve(int value1, int value2, int answer)
        {
            if (value1 + value2 == answer)
            {
                Clients.Caller.correct(true);
                Clients.All.newSolution($"{Clients.Caller.myUserName} solved {value1} + {value2} = {answer}");
            }
            else
            {
                Clients.Caller.correct(false);
            }
        }

        public override Task OnConnected()
        {
            var connectInfo = new ConnectionInfo { Id = Context.ConnectionId, Time = DateTime.UtcNow.ToShortTimeString() };

            return Clients.Others.notifyJoin(connectInfo);
        }
    }

    public class ConnectionInfo
    {
        public string Id { get; set; }
        public string Time { get; set; }
    }
}