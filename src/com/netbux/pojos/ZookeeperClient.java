package com.netbux.pojos;

import org.apache.curator.RetryPolicy;
import org.apache.curator.framework.CuratorFramework;
import org.apache.curator.framework.CuratorFrameworkFactory;
import org.apache.curator.retry.ExponentialBackoffRetry;

public class ZookeeperClient {
	
	private static ZookeeperClient instance;
	private CuratorFramework client;
	public static String BASE_PATH = "/Netbux_Microservice/netbux/";
	
	private ZookeeperClient() {
		RetryPolicy retryPolicy = new ExponentialBackoffRetry(1000, 3);
		this.client = CuratorFrameworkFactory.newClient("149.165.170.59", retryPolicy);
	}
	
	public static ZookeeperClient getInstance() {
		if(instance == null) {
			instance = new ZookeeperClient();
		}
		return instance;
	}

	public CuratorFramework getClient() {
		return client;
	}
}
