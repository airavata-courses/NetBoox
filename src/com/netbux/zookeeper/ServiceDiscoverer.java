package com.netbux.zookeeper;

import java.io.IOException;

import org.apache.curator.RetryPolicy;
import org.apache.curator.framework.CuratorFramework;
import org.apache.curator.framework.CuratorFrameworkFactory;
import org.apache.curator.retry.ExponentialBackoffRetry;
import org.apache.curator.x.discovery.ServiceDiscovery;
import org.apache.curator.x.discovery.ServiceDiscoveryBuilder;
import org.apache.curator.x.discovery.ServiceInstance;
import org.apache.curator.x.discovery.ServiceProvider;
import org.apache.curator.x.discovery.details.JsonInstanceSerializer;

import com.netbux.pojos.InstanceDetails;
import com.netbux.pojos.ZookeeperClient;

public class ServiceDiscoverer {
	
	private CuratorFramework client;
	private ServiceDiscovery<InstanceDetails> serviceDiscovery;
	private ServiceProvider<InstanceDetails> serviceProvider;
	private JsonInstanceSerializer<InstanceDetails> serializer;
	
	
	public ServiceDiscoverer(String serviceName, String serviceBase) {
		
		this.client = ZookeeperClient.getInstance().getClient();
		serializer = new JsonInstanceSerializer<>(InstanceDetails.class);
		serviceDiscovery = ServiceDiscoveryBuilder.builder(InstanceDetails.class).client(client)
							.basePath(ZookeeperClient.BASE_PATH + serviceBase).serializer(serializer).build(); 		 
		serviceProvider = serviceDiscovery.serviceProviderBuilder().serviceName(serviceName).build(); 
	}
	
	public void start() {
		try {
			serviceDiscovery.start();
			serviceProvider.start();
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}
	
	public ServiceInstance<InstanceDetails> getServiceUrl() {
		try {
			return serviceProvider.getInstance();
		} catch (Exception e) {
			throw new RuntimeException("Error obtaining service url", e);
		}
	}
	
	public void close() {
		try {
			serviceProvider.close();
			serviceDiscovery.close();
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}
}
