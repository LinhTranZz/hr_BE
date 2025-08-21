import * as grpc from '@grpc/grpc-js';
import * as protoLoader from '@grpc/proto-loader';
import path from 'path';
import {injectable} from "inversify";
const DEVICE_PROTO_PATH = path.resolve(__dirname, '../proto/device.proto');

const protoOptions = {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
};

const devicePackageDefinition = protoLoader.loadSync(DEVICE_PROTO_PATH, protoOptions);

const deviceProto = grpc.loadPackageDefinition(devicePackageDefinition);

@injectable()
export class DeviceConnectorClient {
  private readonly client: any;

  /**
   * Khởi tạo client kết nối đến server
   * @param serverAddress Địa chỉ server (default: localhost:50051)
   * @param secure Sử dụng kết nối bảo mật hay không
   */
  constructor(serverAddress: string = '0.0.0.0:5283', secure: boolean = false) {
    const credentials = secure ? grpc.credentials.createSsl() : grpc.credentials.createInsecure();

    this.client = new (deviceProto as any).device.DeviceConnector(serverAddress, credentials);
  }

  /**
   * Helper: Build gRPC metadata with JWT
   */
  private buildMetadata(jwt?: string): grpc.Metadata | undefined {
    if (!jwt) return undefined;
    const metadata = new grpc.Metadata();
    metadata.add('authorization', `Bearer ${jwt}`);
    return metadata;
  }

  /**
   * Lấy số serial của thiết bị
   * @param deviceNumber Số thiết bị
   * @param jwt JWT token để truyền qua metadata
   * @returns Promise với số serial của thiết bị
   */
  async getDeviceSerial(deviceNumber: number, jwt?: string): Promise<{ serialNumber: string }> {
    return new Promise((resolve, reject) => {
      this.client.getDeviceSerial(
        { deviceNumber },
        this.buildMetadata(jwt),
        (error: Error | null, response: any) => {
          if (error) {
            console.error(`Error getting device serial for device ${deviceNumber}:`, error);
            reject(error);
          } else {
            resolve(response);
          }
        }
      );
    });
  }

  /**
   * Kết nối tới thiết bị
   * @param ipAddress Địa chỉ IP của thiết bị
   * @param port Cổng kết nối
   * @param jwt JWT token để truyền qua metadata
   * @returns Promise với kết quả kết nối
   */
  async connect(ipAddress: string, port: number, jwt?: string): Promise<{ success: boolean; message: string }> {
    return new Promise((resolve, reject) => {
      this.client.connect(
        { ipAddress, port },
        this.buildMetadata(jwt),
        (error: Error | null, response: any) => {
          if (error) {
            console.error('Error connecting to device:', error);
            reject(error);
          } else {
            resolve(response);
          }
        }
      );
    });
  }

  /**
   * Ngắt kết nối thiết bị
   * @param jwt JWT token để truyền qua metadata
   * @returns Promise với kết quả ngắt kết nối
   */
  async disconnect(jwt?: string): Promise<{ success: boolean; message: string }> {
    return new Promise((resolve, reject) => {
      this.client.disconnect(
        {},
        this.buildMetadata(jwt),
        (error: Error | null, response: any) => {
          if (error) {
            console.error('Error disconnecting device:', error);
            reject(error);
          } else {
            resolve(response);
          }
        }
      );
    });
  }
  /**
   * Xóa quyền admin trên thiết bị
   * @param jwt JWT token để truyền qua metadata
   * @returns Promise với kết quả xóa quyền admin
   */
  async clearAdmin(jwt?: string): Promise<{ success: boolean; message: string }> {
    return new Promise((resolve, reject) => {
      this.client.clearAdmin(
        {},
        this.buildMetadata(jwt),
        (error: Error | null, response: any) => {
          if (error) {
            console.error('Error clearing admin rights:', error);
            reject(error);
          } else {
            resolve(response);
          }
        }
      );
    });
  }

  /**
   * Xoá dữ liệu chấm công trên thiết bị
   * @param jwt JWT token để truyền qua metadata
   * @returns Promise với kết quả đồng bộ dữ liệu
   */
  async clearGLog(jwt?: string): Promise<{ success: boolean; message: string }> {
    return new Promise((resolve, reject) => {
      this.client.clearGLog(
        {},
        this.buildMetadata(jwt),
        (error: Error | null, response: any) => {
          if (error) {
            console.error('Error clearing GLog:', error);
            reject(error);
          } else {
            resolve(response);
          }
        }
      );
    });
  }

  /**
   * Đồng bộ thời gian thiết bị
   * @param jwt JWT token để truyền qua metadata
   * @returns Promise với kết quả đồng bộ thời gian
   */
  async syncDeviceTime(jwt?: string): Promise<{ success: boolean; message: string }> {
    return new Promise((resolve, reject) => {
      this.client.syncDeviceTime(
        {},
        this.buildMetadata(jwt),
        (error: Error | null, response: any) => {
          if (error) {
            console.error('Error syncing device time:', error);
            reject(error);
          } else {
            resolve(response);
          }
        }
      );
    });
  }
}

export default DeviceConnectorClient;
