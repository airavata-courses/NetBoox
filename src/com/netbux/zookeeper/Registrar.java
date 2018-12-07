package com.netbux.zookeeper;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.URL;

import org.apache.curator.framework.CuratorFramework;
import org.apache.curator.x.discovery.ServiceDiscovery;
import org.apache.curator.x.discovery.ServiceDiscoveryBuilder;
import org.apache.curator.x.discovery.ServiceInstance;
import org.apache.curator.x.discovery.UriSpec;
import org.apache.curator.x.discovery.details.JsonInstanceSerializer;

import com.netbux.pojos.InstanceDetails;
import com.netbux.pojos.ZookeeperClient;

public class Registrar {
	private ServiceDiscovery<InstanceDetails> serviceDiscovery;
	private CuratorFramework client;
	private JsonInstanceSerializer<InstanceDetails> serializer;
	private ServiceInstance<InstanceDetails> thisInstance;
	private String serviceName;
	private String serviceBase;
	
	public Registrar(CuratorFramework client, String serviceName, InstanceDetails serviceInstance, String serviceBase) {
		this.serviceName = serviceName;
		this.client = client;
		this.serviceBase = serviceBase;
		
		serializer = new JsonInstanceSerializer<>(InstanceDetails.class);
		UriSpec uriSpec = new UriSpec("{scheme}://{address}:{port}");
		
		try {
			URL whatismyip = new URL("http://checkip.amazonaws.com");
			BufferedReader in = new BufferedReader(new InputStreamReader(whatismyip.openStream()));
			String ip = in.readLine();
			
			thisInstance = ServiceInstance.<InstanceDetails>builder().name(this.serviceName)
							.uriSpec(uriSpec)
							.address(ip)
							.payload(serviceInstance).port(30003) 
							.build();
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}
	
	public void registerService() {
		serviceDiscovery = ServiceDiscoveryBuilder.builder(InstanceDetails.class)
		.client(client)
		.basePath(ZookeeperClient.BASE_PATH + serviceBase).serializer(serializer).thisInstance(thisInstance)
		.build();
		
		try {
			serviceDiscovery.start();
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} 
	}
	
	public void close() {
		try {
			serviceDiscovery.close();
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}

	public ServiceDiscovery<InstanceDetails> getServiceDiscovery() {
		return serviceDiscovery;
	}

}
