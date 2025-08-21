import * as grpc from '@grpc/grpc-js';
import * as protoLoader from '@grpc/proto-loader';
import path from 'path';
import {injectable} from "inversify";

const EMPLOYEE_PROTO_PATH = path.resolve(__dirname, '../proto/employee.proto');

const protoOptions = {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
};

const employeePackageDefinition = protoLoader.loadSync(EMPLOYEE_PROTO_PATH, protoOptions);

const employeeProto = grpc.loadPackageDefinition(employeePackageDefinition);

interface Fingerprint {
  employeeId: number;
  fingerIndex: number;
  fingerData: string;
}

interface UploadResult {
  employee_id: number;
  success: boolean;
  message: string;
}

interface BatchUploadEmployeeDataResponse {
  results: UploadResult[];
  success_count: number;
  failure_count: number;
  message: string;
}

interface BatchUploadFingerprintsResponse {
  results: UploadResult[];
  success_count: number;
  failure_count: number;
  message: string;
}


@injectable()
export class EmployeeServiceClient {
  private readonly client: any;

  /**
   * Khởi tạo client kết nối đến server
   * @param serverAddress Địa chỉ server (default: localhost:50051)
   * @param secure Sử dụng kết nối bảo mật hay không
   */
  constructor(serverAddress: string = '0.0.0.0:5283', secure: boolean = false) {
    const credentials = secure ? grpc.credentials.createSsl() : grpc.credentials.createInsecure();

    this.client = new (employeeProto as any).employee.EmployeeService(serverAddress, credentials);
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
   * Upload thông tin nhân viên
   * @param employeeData Thông tin nhân viên cần upload
   * @param jwt JWT token để truyền qua metadata
   * @returns Promise với kết quả từ server
   */
  async uploadEmployeeData(employeeData: {
    employeeId: number;
    name: string;
    password: string;
    privilege: number;
    enable: boolean;
  }, jwt?: string): Promise<{ success: boolean; message: string }> {
    return new Promise((resolve, reject) => {
      this.client.uploadEmployeeData(
        { employee: employeeData },
        this.buildMetadata(jwt),
        (error: Error | null, response: any) => {
          if (error) {
            console.error('Error uploading employee data:', error);
            reject(error);
          } else {
            resolve(response);
          }
        }
      );
    });
  }

  /**
   * Lấy thông tin nhân viên theo ID
   * @param employeeId ID của nhân viên cần lấy thông tin
   * @param jwt JWT token để truyền qua metadata
   * @returns Promise với thông tin nhân viên
   */
  async getEmployeeData(employeeId: number, jwt?: string): Promise<{ employee: any; message: string }> {
    return new Promise((resolve, reject) => {
      this.client.getEmployeeData(
        { employeeId },
        this.buildMetadata(jwt),
        (error: Error | null, response: any) => {
          if (error) {
            console.error(`Error getting employee ${employeeId}:`, error);
            reject(error);
          } else {
            resolve(response);
          }
        }
      );
    });
  }

  /**
   * Lấy danh sách tất cả nhân viên
   * @param jwt JWT token để truyền qua metadata
   * @returns Promise với danh sách nhân viên
   */
  async getAllEmployees(jwt?: string): Promise<{ employees: any[]; message: string }> {
    return new Promise((resolve, reject) => {
      this.client.getAllEmployees(
        {},
        this.buildMetadata(jwt),
        (error: Error | null, response: any) => {
          if (error) {
            console.error('Error getting all employees:', error);
            reject(error);
          } else {
            resolve(response);
          }
        }
      );
    });
  }

  /**
   * Upload nhiều thông tin nhân viên cùng lúc
   * @param employeeDataList Danh sách thông tin nhân viên cần upload
   * @param jwt JWT token để truyền qua metadata
   * @returns Promise với kết quả từ server
   */
  async batchUploadEmployeeData(employeeDataList: {
    employeeId: number;
    name: string;
    password: string;
    privilege: number;
    enable: boolean;
  }[], jwt?: string): Promise<BatchUploadEmployeeDataResponse> {
    return new Promise((resolve, reject) => {
      this.client.batchUploadEmployeeData(
        { employees: employeeDataList },
        this.buildMetadata(jwt),
        (error: Error | null, response: any) => {
          if (error) {
            console.error('Error batch uploading employee data:', error);
            reject(error);
          } else {
            resolve(response);
          }
        }
      );
    });
  }

  /**
   * Lấy danh sách tất cả vân tay
   * @param jwt JWT token để truyền qua metadata
   * @returns Promise với danh sách vân tay
   */
  async getAllFingerprints(jwt?: string): Promise<{ fingerprints: any[]; success_count: number; message: string }> {
    return new Promise((resolve, reject) => {
      this.client.getAllFingerprints(
        {},
        this.buildMetadata(jwt),
        (error: Error | null, response: any) => {
          if (error) {
            console.error('Error getting all fingerprints:', error);
            reject(error);
          } else {
            resolve(response);
          }
        }
      );
    });
  }

  /**
   * Upload nhiều vân tay cùng lúc
   * @param fingerprintList Danh sách vân tay cần upload
   * @param jwt JWT token để truyền qua metadata
   * @returns Promise với kết quả từ server
   */
  async batchUploadFingerprints(fingerprintList: Fingerprint[], jwt?: string): Promise<BatchUploadFingerprintsResponse> {
    return new Promise((resolve, reject) => {
      this.client.batchUploadFingerprints(
        { fingerprints: fingerprintList },
        this.buildMetadata(jwt),
        (error: Error | null, response: any) => {
          if (error) {
            console.error('Error batch uploading fingerprints:', error);
            reject(error);
          } else {
            resolve(response);
          }
        }
      );
    });
  }

  /**
   * Xóa thông tin nhân viên theo ID
   * @param employeeId ID của nhân viên cần xóa
   * @param jwt JWT token để truyền qua metadata
   * @returns Promise với kết quả từ server
   */
  async deleteEmployeeData(employeeId: number, jwt?: string): Promise<{ success: boolean; message: string }> {
    return new Promise((resolve, reject) => {
      this.client.deleteEmployeeData(
        { employeeId },
        this.buildMetadata(jwt),
        (error: Error | null, response: any) => {
          if (error) {
            console.error(`Error deleting employee ${employeeId}:`, error);
            reject(error);
          } else {
            resolve(response);
          }
        }
      );
    });
  }

  async deleteFingerprint(employeeId: number, fingerIndex: number, jwt?: string): Promise<{ success: boolean; message: string }> {
    return new Promise((resolve, reject) => {
      this.client.deleteFingerprint(
        { employeeId, fingerIndex },
        this.buildMetadata(jwt),
        (error: Error | null, response: any) => {
          if (error) {
            console.error(`Error deleting fingerprint for employee ${employeeId} at index ${fingerIndex}:`, error);
            reject(error);
          } else {
            resolve(response);
          }
        }
      );
    });
  }

  /**
   * Lấy dữ liệu vân tay của một nhân viên theo employeeId và fingerIndex
   * @param employeeId ID của nhân viên
   * @param jwt JWT token để truyền qua metadata
   * @returns Promise với dữ liệu vân tay
   */
  async getFingerprintData(employeeId: number, jwt?: string): Promise<{ success: boolean; message: string; fingerprint: any }> {
    return new Promise((resolve, reject) => {
      this.client.getFingerprintData(
        { employeeId },
        this.buildMetadata(jwt),
        (error: Error | null, response: any) => {
          if (error) {
            console.error(`Error getting fingerprint for employee ${employeeId}`, error);
            reject(error);
          } else {
            resolve(response);
          }
        }
      );
    });
  }

  /**
   * Đồng bộ dữ liệu chấm công từ thiết bị
   * @param jwt JWT token để truyền qua metadata
   * @returns Promise với kết quả từ server
   */
  async syncAttendanceData(jwt?: string): Promise<{ success: boolean; message: string }> {
    return new Promise((resolve, reject) => {
      this.client.syncAttendanceData(
        {},
        this.buildMetadata(jwt),
        (error: Error | null, response: any) => {
          if (error) {
            console.error('Error syncing attendance data:', error);
            reject(error);
          } else {
            resolve(response);
          }
        }
      );
    });
  }
}

export default EmployeeServiceClient;
